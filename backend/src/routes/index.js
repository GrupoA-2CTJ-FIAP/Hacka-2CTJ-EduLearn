const express = require('express')
const {
  createUser,
  login,
  getUsers,
  getUserStudent,
  getUserTeacher,
  updateUser,
  deleteUser
} = require('../controllers/userController')
const {
  addVideo,
  editVideo,
  deleteVideo,
  getVideosByProfessor,
  getVideosByAluno
} = require('../controllers/videoController')
const { authMiddleware, checkRole } = require('../middlewares/authMiddleware')

const router = express.Router()

// Rotas de usuário
router.post('/signup', createUser)
router.post('/login', login)
router.get('/users', authMiddleware, getUsers)
router.get('/student', authMiddleware, getUserStudent)
router.get('/teacher', getUserTeacher)
router.put('/users/:id_usuario', authMiddleware, updateUser)
router.delete('/users/:id_usuario', authMiddleware, deleteUser)

// Rotas de vídeos
router.post('/videos', authMiddleware, addVideo)
router.put('/videos/:id_video', authMiddleware, editVideo)
router.delete('/videos/:id_video', authMiddleware, deleteVideo)
router.get('/videos/professor', authMiddleware, getVideosByProfessor)
router.get('/videos/aluno', authMiddleware, getVideosByAluno)

module.exports = router
