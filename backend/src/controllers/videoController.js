const supabase = require('../config/supabase')

// Adicionar um vídeo
exports.addVideo = async (req, res) => {
  const { nome_video, video_url, comentario } = req.body
  const { user } = req.user // Extraindo informações do usuário autenticado

  // Certifique-se de que o auth_id está disponível a partir do token
  const auth_id = user ? user.id : null

  if (!auth_id) {
    return res.status(400).json({ error: 'auth_id não encontrado no token' })
  }

  try {
    // Buscar o id_usuario baseado no auth_id
    const { data: userData, error: userError } = await supabase
      .from('d_usuarios')
      .select('id_usuario')
      .eq('auth_id', auth_id)
      .single()

    if (userError || !userData) {
      console.error('Erro ao buscar o id_usuario:', userError)
      return res.status(400).json({ error: 'Erro ao buscar o id_usuario' })
    }

    const { id_usuario } = userData

    // Inserir o vídeo na tabela d_catalogo
    const { data, error } = await supabase
      .from('d_catalogo')
      .insert([{ nome_video, video_url, comentario, id_usuario }])

    if (error) {
      console.error('Erro ao adicionar vídeo no Supabase:', error)
      return res.status(400).json({ error: error.message })
    }

    console.log('Vídeo adicionado com sucesso:', data)
    res.status(201).json({ message: 'Vídeo adicionado com sucesso', data })
  } catch (error) {
    console.error('Erro inesperado ao adicionar vídeo:', error)
    res.status(500).json({ error: 'Erro ao adicionar vídeo' })
  }
}

// Editar um vídeo
exports.editVideo = async (req, res) => {
  const { nome_video, video_url, comentario } = req.body
  const { user } = req.user
  const auth_id = user ? user.id : null

  if (!auth_id) {
    console.error('auth_id não encontrado no token')
    return res.status(400).json({ error: 'auth_id não encontrado no token' })
  }

  // Capturando o id_video da URL
  const id_video = req.params.id_video // Corrija para usar o nome correto da variável

  // Verificando se todos os campos necessários estão presentes
  if (!id_video || !nome_video || !video_url || comentario === undefined) {
    console.error('Campos obrigatórios não fornecidos:', {
      id_video,
      nome_video,
      video_url,
      comentario
    })
    return res
      .status(400)
      .json({ error: 'Todos os campos obrigatórios devem ser fornecidos' })
  }
  try {
    // Buscar o id_usuario baseado no auth_id
    const { data: userData, error: userError } = await supabase
      .from('d_usuarios')
      .select('id_usuario')
      .eq('auth_id', auth_id)
      .single()

    if (userError || !userData) {
      console.error('Erro ao buscar o id_usuario:', userError)
      return res.status(400).json({ error: 'Erro ao buscar o id_usuario' })
    }

    const { id_usuario } = userData

    const { data, error } = await supabase
      .from('d_catalogo')
      .update({ nome_video, video_url, comentario }) // Incluído 'comentario'
      .eq('id_video', id_video)
      .eq('id_usuario', id_usuario) // Garante que o vídeo pertence ao professor

    if (error) {
      console.error('Erro ao atualizar vídeo no Supabase:', error)
      return res.status(400).json({ error: error.message })
    }

    console.log('Vídeo atualizado com sucesso:', data)
    res.status(200).json({ message: 'Vídeo atualizado com sucesso', data })
  } catch (error) {
    console.error('Erro inesperado ao atualizar vídeo:', error)
    res.status(500).json({ error: 'Erro ao atualizar vídeo' })
  }
}

// Excluir um vídeo
exports.deleteVideo = async (req, res) => {
  const { id_video } = req.params
  const { user } = req.user // Extraindo informações do usuário autenticado

  const auth_id = user ? user.id : null

  if (!auth_id) {
    return res.status(400).json({ error: 'auth_id não encontrado no token' })
  }

  try {
    // Buscar o id_usuario baseado no auth_id
    const { data: userData, error: userError } = await supabase
      .from('d_usuarios')
      .select('id_usuario')
      .eq('auth_id', auth_id)
      .single()

    if (userError || !userData) {
      console.error('Erro ao buscar o id_usuario:', userError)
      return res.status(400).json({ error: 'Erro ao buscar o id_usuario' })
    }

    const { id_usuario } = userData

    const { data, error } = await supabase
      .from('d_catalogo')
      .delete()
      .eq('id_video', id_video)
      .eq('id_usuario', id_usuario) // Garante que o vídeo pertence ao professor

    if (error) return res.status(400).json({ error: error.message })

    res.status(200).json({ message: 'Vídeo excluído com sucesso', data })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir vídeo' })
  }
}

// Listar todos os vídeos do professor autenticado
exports.getVideosByProfessor = async (req, res) => {
  const { user } = req.user // Extraindo informações do usuário autenticado

  const auth_id = user ? user.id : null

  if (!auth_id) {
    return res.status(400).json({ error: 'auth_id não encontrado no token' })
  }

  try {
    // Buscar o id_usuario baseado no auth_id
    const { data: userData, error: userError } = await supabase
      .from('d_usuarios')
      .select('id_usuario')
      .eq('auth_id', auth_id)
      .single()

    if (userError || !userData) {
      console.error('Erro ao buscar o id_usuario:', userError)
      return res.status(400).json({ error: 'Erro ao buscar o id_usuario' })
    }

    const { id_usuario } = userData

    const { data, error } = await supabase
      .from('d_catalogo')
      .select('*')
      .eq('id_usuario', id_usuario) // Filtra vídeos pelo ID do professor

    if (error) return res.status(400).json({ error: error.message })

    res.status(200).json({ data })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar vídeos' })
  }
}

// Listar vídeos do professor vinculado ao aluno autenticado
exports.getVideosByAluno = async (req, res) => {
  const { user } = req.user // Extraindo informações do usuário autenticado

  const auth_id = user ? user.id : null

  if (!auth_id) {
    return res.status(400).json({ error: 'auth_id não encontrado no token' })
  }

  try {
    // Buscar o professor vinculado ao aluno baseado no auth_id
    const { data: usuario, error: usuarioError } = await supabase
      .from('d_usuarios')
      .select('id_professor')
      .eq('auth_id', auth_id)
      .single()

    if (usuarioError || !usuario) {
      console.error('Erro ao buscar o id_professor:', usuarioError)
      return res.status(400).json({ error: 'Erro ao buscar o id_professor' })
    }

    const id_professor = usuario.id_professor

    // Agora, busca os vídeos do professor vinculado
    const { data: videos, error: videoError } = await supabase
      .from('d_catalogo')
      .select('*')
      .eq('id_usuario', id_professor) // Filtra vídeos pelo ID do professor

    if (videoError) return res.status(400).json({ error: videoError.message })

    res.status(200).json({ data: videos })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar vídeos' })
  }
}
