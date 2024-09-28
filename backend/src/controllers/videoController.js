const supabase = require('../config/supabase')

//Função para tratar URL de vídeo
function extractYouTubeId(url) {
  const regex =
    /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  const matches = url.match(regex)
  return matches ? matches[1] : null
}

// Adicionar um vídeo
exports.addVideo = async (req, res) => {
  const { nome_video, video_url, comentario } = req.body
  const { user } = req.user

  const auth_id = user ? user.id : null

  if (!auth_id) {
    return res.status(400).json({ error: 'auth_id não encontrado no token' })
  }

  const videoId = extractYouTubeId(video_url)
  if (!videoId) {
    return res.status(400).json({ error: 'URL de vídeo inválida' })
  }

  try {
    const { data: userData, error: userError } = await supabase
      .from('d_usuarios')
      .select('id_usuario')
      .eq('auth_id', auth_id)
      .single()

    if (userError || !userData) {
      console.error('Erro ao buscar o id_usuario:', userError)
      return res
        .status(400)
        .json({ error: 'Erro ao buscar o id_usuario', details: userError })
    }

    const { id_usuario } = userData

    const { data, error } = await supabase
      .from('d_catalogo')
      .insert([{ nome_video, video_url, comentario, id_usuario }])

    if (error) {
      console.error('Erro ao adicionar vídeo no Supabase:', error)
      return res
        .status(400)
        .json({ error: 'Erro ao adicionar vídeo', details: error })
    }

    console.log('Vídeo adicionado com sucesso:', data)
    res.status(201).json({ message: 'Vídeo adicionado com sucesso', data })
  } catch (error) {
    console.error('Erro inesperado ao adicionar vídeo:', error)
    res.status(500).json({ error: 'Erro ao adicionar vídeo', details: error })
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

  const id_video = req.params.id_video

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

  const videoId = extractYouTubeId(video_url)
  if (!videoId) {
    return res.status(400).json({ error: 'URL de vídeo inválida' })
  }

  try {
    const { data: userData, error: userError } = await supabase
      .from('d_usuarios')
      .select('id_usuario')
      .eq('auth_id', auth_id)
      .single()

    if (userError || !userData) {
      console.error('Erro ao buscar o id_usuario:', userError)
      return res
        .status(400)
        .json({ error: 'Erro ao buscar o id_usuario', details: userError })
    }

    const { id_usuario } = userData

    const { data: videoData, error: videoError } = await supabase
      .from('d_catalogo')
      .select('id_usuario')
      .eq('id_video', id_video)
      .single()

    if (videoError || !videoData) {
      console.error('Erro ao buscar vídeo:', videoError)
      return res
        .status(400)
        .json({ error: 'Erro ao buscar vídeo', details: videoError })
    }

    if (videoData.id_usuario !== id_usuario) {
      return res
        .status(403)
        .json({ message: 'Você não tem permissão para editar este vídeo' })
    }

    const { data, error } = await supabase
      .from('d_catalogo')
      .update({ nome_video, video_url: videoId, comentario })
      .eq('id_video', id_video)
      .eq('id_usuario', id_usuario)

    if (error) {
      console.error('Erro ao atualizar vídeo no Supabase:', error)
      return res
        .status(400)
        .json({ error: 'Erro ao atualizar vídeo', details: error })
    }

    console.log('Vídeo atualizado com sucesso:', data)
    res.status(200).json({ message: 'Vídeo atualizado com sucesso', data })
  } catch (error) {
    console.error('Erro inesperado ao atualizar vídeo:', error)
    res.status(500).json({ error: 'Erro ao atualizar vídeo', details: error })
  }
}

// Excluir um vídeo
exports.deleteVideo = async (req, res) => {
  const { id_video } = req.params
  const { user } = req.user

  const auth_id = user ? user.id : null

  if (!auth_id) {
    return res.status(400).json({ error: 'auth_id não encontrado no token' })
  }

  try {
    const { data: userData, error: userError } = await supabase
      .from('d_usuarios')
      .select('id_usuario')
      .eq('auth_id', auth_id)
      .single()

    if (userError || !userData) {
      console.error('Erro ao buscar o id_usuario:', userError)
      return res
        .status(400)
        .json({ error: 'Erro ao buscar o id_usuario', details: userError })
    }

    const { id_usuario } = userData

    const { data: videoData, error: videoError } = await supabase
      .from('d_catalogo')
      .select('id_usuario')
      .eq('id_video', id_video)
      .single()

    if (videoError || !videoData) {
      console.error('Erro ao buscar vídeo:', videoError)
      return res
        .status(400)
        .json({ error: 'Erro ao buscar vídeo', details: videoError })
    }

    if (videoData.id_usuario !== id_usuario) {
      return res
        .status(403)
        .json({ message: 'Você não tem permissão para excluir este vídeo' })
    }

    const { data, error } = await supabase
      .from('d_catalogo')
      .delete()
      .eq('id_video', id_video)

    if (error) {
      console.error('Erro ao excluir vídeo:', error)
      return res
        .status(400)
        .json({ error: 'Erro ao excluir vídeo', details: error })
    }

    res.status(200).json({ message: 'Vídeo excluído com sucesso', data })
  } catch (error) {
    console.error('Erro inesperado ao excluir vídeo:', error)
    res.status(500).json({ error: 'Erro ao excluir vídeo', details: error })
  }
}

// Listar todos os vídeos do professor autenticado
exports.getVideosByProfessor = async (req, res) => {
  const { user } = req.user

  const auth_id = user ? user.id : null

  if (!auth_id) {
    return res.status(400).json({ error: 'auth_id não encontrado no token' })
  }

  try {
    const { data: userData, error: userError } = await supabase
      .from('d_usuarios')
      .select('id_usuario')
      .eq('auth_id', auth_id)
      .single()

    if (userError || !userData) {
      console.error('Erro ao buscar o id_usuario:', userError)
      return res
        .status(400)
        .json({ error: 'Erro ao buscar o id_usuario', details: userError })
    }

    const { id_usuario } = userData

    const { data, error } = await supabase
      .from('d_catalogo')
      .select('*')
      .eq('id_usuario', id_usuario)

    if (error) {
      console.error('Erro ao listar vídeos:', error)
      return res
        .status(400)
        .json({ error: 'Erro ao listar vídeos', details: error })
    }

    res.status(200).json({ data })
  } catch (error) {
    console.error('Erro inesperado ao listar vídeos:', error)
    res.status(500).json({ error: 'Erro ao listar vídeos', details: error })
  }
}

// Listar vídeos do professor vinculado ao aluno autenticado
exports.getVideosByAluno = async (req, res) => {
  const { user } = req.user

  const auth_id = user ? user.id : null

  if (!auth_id) {
    return res.status(400).json({ error: 'auth_id não encontrado no token' })
  }

  try {
    const { data: usuario, error: usuarioError } = await supabase
      .from('d_usuarios')
      .select('id_professor')
      .eq('auth_id', auth_id)
      .single()

    if (usuarioError || !usuario) {
      console.error('Erro ao buscar o id_professor:', usuarioError)
      return res
        .status(400)
        .json({ error: 'Erro ao buscar o id_professor', details: usuarioError })
    }

    const { data: professor, error: professorError } = await supabase
      .from('d_usuarios')
      .select('nome_usuario')
      .eq('id_usuario', usuario.id_professor)
      .single()

    if (professorError || !professor) {
      console.error('Erro ao buscar o nome_usuario do professor:', usuarioError)
      return res
        .status(400)
        .json({ error: 'Erro ao buscar o nome_usuario do professor', details: usuarioError })
    }
    const id_professor = usuario.id_professor
    const nome_professor = professor.nome_usuario

    const { data: videos, error: videoError } = await supabase
      .from('d_catalogo')
      .select('*')
      .eq('id_usuario', id_professor)

    if (videoError) {
      console.error('Erro ao listar vídeos do professor:', videoError)
      return res
        .status(400)
        .json({ error: 'Erro ao listar vídeos', details: videoError })
    }

    res.status(200).json({ videos, professor: nome_professor })
  } catch (error) {
    console.error('Erro inesperado ao listar vídeos do professor:', error)
    res.status(500).json({ error: 'Erro ao listar vídeos', details: error })
  }
}
