
const express = require('express')
const bodyParser = require('body-parser')

// Inicializar variáveis
const app = express()
const router = express.Router()

// Configurações do body-parser
app.use( bodyParser.urlencoded({ extended: true }) )
app.use( bodyParser.json() )

// Nosso Banco de Dados - Mockado
let alunosLista = [
	{nome:"Charles", matricula:"201902500699"}, 
	{nome: "Alex", matricula: "201807854709"},
	{nome: "Adriele", matricula: "202004567599"}
	]

const listarTodos = router.get( '/', ( req, res ) => res.status(200).json(
	{ 
		ok: true,
		msg: "Lista de Todos os Alunos",
		lista: alunosLista
 	}))

const buscarPorMatricula = router.get('/:matricula', ( req, res ) => {	
	
	const matricula = req.params.matricula  
	
	const alunoEncontrado = alunosLista.filter( a => a.matricula == matricula )  
		
	return res.status(200).json({ ok: true, aluno:alunoEncontrado })
	
})
 
const criar = router.post('/',  ( req, res ) => {

	const body = req.body
	
    const alunoCriado = {

        nome: body.nome,
        matricula: body.matricula

    }

    alunosLista.push(alunoCriado)
	
	return res.status(201).json(alunoCriado)
})

const atualizarAlunoPorMatricula = router.put('/:matricula', (req,res) => {

	const matricula = req.params.matricula 

	const body = req.body

	const alunoAtualizado = {

		nome: body.nome,
		matricula: body.matricula

	}
	
	const index = alunosLista.findIndex( a => a.matricula == matricula )

	alunosLista[index].nome = alunoAtualizado.nome
	alunosLista[index].matricula = alunoAtualizado.matricula

	return res.status(200).json({ ok: true, msg:"Aluno Atualizado", listaAtualizada: alunosLista })

})

const apagarPorMatricula = router.delete('/:matricula', ( req, res ) => {	
	
	const matricula = req.params.matricula  


	const idxExcluir = alunosLista.findIndex( a => a.matricula == matricula ) 

	const alunoExcluido = alunosLista[idxExcluir].nome 
	
	alunosLista.splice( idxExcluir, 1 )

	return res.status(200).json({ 

		ok: true,
		msg: `O aluno, ${alunoExcluido}, foi excluido com sucesso!`   ,
		alunos: alunosLista
		
	 })
	
})


// Registre Abaixo todas as Rotas do Recurso de Alunos - CRUD
app.use( '/alunos', listarTodos )
app.use( '/alunos', buscarPorMatricula )
app.use( '/alunos', criar )
app.use( '/alunos', atualizarAlunoPorMatricula )
app.use( '/alunos', apagarPorMatricula )

const PORTA = 3000
app.listen( PORTA,  _ => console.log(`Express server rodando na porta ${PORTA}`) )

