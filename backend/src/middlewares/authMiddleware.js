const supabase = require('../config/supabase')

// Middleware para verificar a autenticação
exports.authMiddleware = async (req, res, next) => {
  const authHeader = req.headers['authorization']

  console.log('Authorization Header recebido:', authHeader)

  if (!authHeader) {
    console.log('Nenhum token fornecido')
    return res
      .status(401)
      .json({ message: 'Acesso negado. Token não fornecido.' })
  }

  const token = authHeader.split(' ')[1]

  console.log('Token extraído:', token)

  try {
    const { data: user, error } = await supabase.auth.getUser(token)

    console.log('Resultado da verificação do token:', { user, error })

    if (error) {
      console.log('Erro ao verificar o token:', error.message || error)
      return res.status(400).json({ message: 'Token inválido' })
    }

    req.user = user
    next()
  } catch (error) {
    console.log('Erro de autenticação:', error.message || error)
    res.status(500).json({ message: 'Erro de autenticação' })
  }
}
