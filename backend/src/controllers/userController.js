const supabase = require('../config/supabase')

//Função para criar usuários Alunos e Professores
exports.createUser = async (req, res) => {
  const {
    nome_usuario,
    numero_documento,
    email,
    senha,
    id_professor,
    flag_professor
  } = req.body

  try {
    // Criação de usuário no Supabase (auth)
    const { data: authUser, error: authError } = await supabase.auth.signUp({
      email,
      password: senha
    })

    if (!authUser || !authUser.user) {
      console.error('Erro ao criar usuário no Supabase:', authError)
      return res.status(400).json({ error: authError.message })
    }

    // Determinar o papel (role) do usuário baseado na flag_professor
    const role = flag_professor ? 'teacher' : 'student'

    // Atualizar o campo email_verified para true no raw_user_meta_data
    const { error: updateMetaError } = await supabase.auth.admin.updateUserById(
      authUser.user.id,
      {
        raw_user_meta_data: { email_verified: true } // Confirmar o e-mail
      }
    )

    if (updateMetaError) {
      console.error('Erro ao atualizar metadados do usuário:', updateMetaError)
      return res.status(400).json({ error: updateMetaError.message })
    }

    // Atualizar o papel do usuário na tabela auth.users
    console.log('Atualizando papel do usuário:', {
      role,
      userId: authUser.user.id
    })

    const { error: roleError } = await supabase.auth.admin.updateUserById(
      authUser.user.id,
      { role }
    )

    if (roleError) {
      console.error(
        'Erro ao atualizar o papel do usuário na tabela auth.users:',
        roleError.message
      )
      console.log('Resultado da atualização do papel:', roleError)
      return res.status(400).json({ error: roleError.message })
    }

    // Inserir dados adicionais na tabela 'd_usuarios'
    const { data, error } = await supabase.from('d_usuarios').insert([
      {
        nome_usuario,
        numero_documento,
        auth_id: authUser.user.id,
        id_professor,
        flag_professor // Aqui, armazenando a informação de flag_professor
      }
    ])

    if (error) {
      console.error('Erro ao inserir usuário na tabela d_usuarios:', error)
      return res.status(400).json({ error: error.message })
    }

    res.status(201).json({ message: 'Usuário criado com sucesso', data })
  } catch (error) {
    console.error('Erro inesperado ao criar usuário:', error)
    res.status(500).json({ error: 'Erro ao criar usuário' })
  }
}

// Função para login de usuários
exports.login = async (req, res) => {
  const { email, senha } = req.body

  try {
    // Autenticação no Supabase
    const { data: authUser, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password: senha
      })

    if (authError)
      return res.status(401).json({ error: 'Credenciais inválidas' })

    res.status(200).json({
      message: 'Login realizado com sucesso',
      session: authUser.session
    })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao fazer login' })
  }
}

// Função para listar todos os usuários
exports.getUsers = async (req, res) => {
  try {
    const { data, error } = await supabase.from('d_usuarios').select('*')

    if (error) return res.status(400).json({ error: error.message })

    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter usuários' })
  }
}

// Função para obter todos os alunos (flag_professor = false)
exports.getUserStudent = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('d_usuarios')
      .select('*')
      .eq('flag_professor', false)

    if (error) return res.status(400).json({ error: error.message })

    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter alunos' })
  }
}

// Função para obter todos os professores (flag_professor = true)
exports.getUserTeacher = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('d_usuarios')
      .select('*')
      .eq('flag_professor', true)

    if (error) return res.status(400).json({ error: error.message })

    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter professores' })
  }
}

// Função para atualizar um usuário
exports.updateUser = async (req, res) => {
  const { id_usuario } = req.params
  const { nome_usuario, numero_documento, email, senha, flag_professor } =
    req.body

  console.log(
    `Dados recebidos para atualização: ID: ${id_usuario}, Nome: ${nome_usuario}, Documento: ${numero_documento}, Email: ${email}, Professor: ${flag_professor}`
  )

  try {
    // Verificar se o ID do usuário existe antes de atualizar
    const { data: userCheck, error: checkError } = await supabase
      .from('d_usuarios')
      .select('id_usuario, auth_id')
      .eq('id_usuario', id_usuario)
      .single()

    if (checkError) {
      console.error('Erro ao verificar usuário:', checkError)
      return res.status(400).json({ error: checkError.message })
    }

    if (!userCheck) {
      console.error('Usuário não encontrado com ID:', id_usuario)
      return res.status(404).json({ error: 'Usuário não encontrado' })
    }

    // Atualizar dados na tabela 'd_usuarios'
    console.log(`Atualizando usuário com ID: ${id_usuario}`)
    const { data, error } = await supabase
      .from('d_usuarios')
      .update({
        nome_usuario,
        numero_documento,
        flag_professor
      })
      .eq('id_usuario', id_usuario)

    if (error) {
      console.error('Erro ao atualizar d_usuarios:', error)
      return res.status(400).json({ error: error.message })
    }

    // Atualizar o e-mail e a senha na tabela auth.users
    const { auth_id } = userCheck
    console.log(
      `Atualizando dados de autenticação para o usuário com auth_id: ${auth_id}`
    )

    // Atualizar o e-mail se fornecido
    if (email) {
      const { error: emailError } = await supabase.auth.admin.updateUserById(
        auth_id,
        { email }
      )
      if (emailError) {
        console.error('Erro ao atualizar o e-mail do usuário:', emailError)
        return res.status(400).json({ error: emailError.message })
      }
    }

    // Atualizar a senha se fornecida
    if (senha) {
      const { error: passwordError } = await supabase.auth.admin.updateUserById(
        auth_id,
        { password: senha }
      )
      if (passwordError) {
        console.error('Erro ao atualizar a senha do usuário:', passwordError)
        return res.status(400).json({ error: passwordError.message })
      }
    }

    // Atualizar o papel do usuário
    const role = flag_professor ? 'teacher' : 'student'
    console.log(`Atualizando papel do usuário para: ${role}`)
    const { error: roleError } = await supabase.auth.admin.updateUserById(
      auth_id,
      { role }
    )
    if (roleError) {
      console.error(
        'Erro ao atualizar o papel do usuário na tabela auth.users:',
        roleError.message
      )
      return res.status(400).json({ error: roleError.message })
    }

    console.log('Usuário atualizado com sucesso:', data)
    res.status(200).json({ message: 'Usuário atualizado com sucesso', data })
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error)
    res.status(500).json({ error: 'Erro ao atualizar usuário' })
  }
}

// Função para excluir um usuário
exports.deleteUser = async (req, res) => {
  const { id_usuario } = req.params

  console.log(`Tentando excluir o usuário com ID: ${id_usuario}`)

  try {
    // Obter o auth_id antes de excluir
    const { data: usuario, error: fetchError } = await supabase
      .from('d_usuarios')
      .select('auth_id') // Supondo que você tenha um campo auth_id
      .eq('id_usuario', id_usuario)
      .single()

    if (fetchError) {
      console.error(`Erro ao buscar auth_id: ${fetchError.message}`)
      return res.status(400).json({ error: fetchError.message })
    }

    if (!usuario) {
      console.warn(`Nenhum usuário encontrado com ID: ${id_usuario}`)
      return res.status(404).json({ error: 'Usuário não encontrado' })
    }

    const auth_id = usuario.auth_id

    // Excluir o usuário da tabela d_usuarios
    const { error: deleteError } = await supabase
      .from('d_usuarios')
      .delete()
      .eq('id_usuario', id_usuario)

    if (deleteError) {
      console.error(
        `Erro ao excluir usuário da tabela d_usuarios: ${deleteError.message}`
      )
      return res.status(400).json({ error: deleteError.message })
    }

    console.log(`Usuário excluído da tabela d_usuarios: ${id_usuario}`)

    // Excluir o usuário do Supabase Auth
    const { error: authError } = await supabase.auth.admin.deleteUser(auth_id)

    if (authError) {
      console.error(
        `Erro ao deletar usuário da autenticação: ${authError.message}`
      )
      return res
        .status(500)
        .json({ error: 'Erro ao deletar usuário da autenticação' })
    }

    console.log(`Usuário excluído com sucesso do Supabase Auth: ${auth_id}`)

    res.status(200).json({ message: 'Usuário excluído com sucesso' })
  } catch (error) {
    console.error(`Erro inesperado ao excluir usuário: ${error}`)
    res.status(500).json({ error: 'Erro ao excluir usuário' })
  }
}
