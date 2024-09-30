# Hacka-2CTJ-EduLearn
Hackathon 2CTJ EduLearn Grupo A

## Descrição

Este projeto foi desenvolvido para o Hackathon FIAP 2CTJ. 

```
A EduLearn, uma plataforma dedicada ao aprendizado digital, busca
transformar a experiência educacional de professores e alunos. Com o intuito
de centralizar e facilitar o acesso a conteúdos educacionais, a EduLearn está
desenvolvendo um sistema que permitirá aos professores gerenciar seus
vídeos de ensino e aos alunos acessar conteúdos personalizados.

Contexto do Problema: Professores enfrentam dificuldades em gerenciar
seus vídeos educacionais, distribuídos em diferentes plataformas, sem controle
centralizado. Alunos, por sua vez, têm dificuldade em encontrar vídeos
específicos de seus professores, comprometendo a continuidade do
aprendizado e o engajamento no estudo.

Objetivo do Sistema: Criar uma plataforma onde professores possam
cadastrar, editar e excluir vídeos educacionais de forma centralizada, enquanto
alunos possam acessar conteúdos específicos de seus professores vinculados.
A autenticação de usuários será feita pelo Firebase Authentication ou
Supabase, e o backend será construído usando Node.js + Express com
Firestore, SQL ou MongoDB como banco de dados.
```

## Instalação Backend

Após o Clone do projeto acesse a pasta raiz "Hacka-2CTJ-EduLearn" e navegue até a pasta "backend".

Instale as dependências utilizando: ˋnpm installˋ
Crie o arquivo .env no diretório `backend`

```
SUPABASE_URL= "https://yhuhhyjrbuveavowpwlj.supabase.co (este é o endereço do projeto supabase)"
SUPABASE_KEY= "insira a chave do projeto supabase aqui"
SUPABASE_SECRET_KEY= "insira a chave secreta do projeto supabase aqui"
PORT=3000
```

Para iniciar o Servidor utilize ˋnpm startˋ. Mantenha-o em execução durante todo o teste do projeto.

## Instalação Front-end

Crie o arquivo .env no diretório raiz

```
VITE_SUPABASE_URL= "https://yhuhhyjrbuveavowpwlj.supabase.co (este é o endereço do projeto supabase)"
VITE_SUPABASE_ANON_KEY= "insira a chave anônima do projeto supabase aqui"
```
Na pasta raiz instale as dependências com o comando "npm i" ou "npm install". Execute o comando "npm run dev" dentro do diretório raiz e abra a página localizada por padrão em "http://localhost:5173/".

## Utilização da Aplicação

No início do projeto a página Home será apresentada. Esta é a página de boas-vindas do projeto e apresenta as opções de Login e Cadastro. Também possui uma descrição das funcionalidades da ferramenta.
Crie um cadastro de professor e realize o login.
Se seu cadastro é de professor, você terá permissões de criar novas aulas e então editá-las ou excluí-las como quiser!
Clique em "Sair".
Agora, crie um cadastro de aluno e realize o login.
Se seu cadastro é de aluno, você deve escolher a qual professor seguir. Você poderá ver apenas as aulas do professor vinculado. Selecione o professor que criou anteriormente e veja as aulas cadastradas!
Se deseja visualizar alguns usuários pré-cadastrados, utilize as seguintes credenciais:

```
Usuário Professor: usuario@adm.com
Senha: 123456
Usuário Aluno: usuario@aluno.com
Senha: 123456
```

<a>Video de Uso</a>
