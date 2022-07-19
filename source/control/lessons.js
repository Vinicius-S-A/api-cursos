const database = require('../databases/knex')
const fieldValidator = require('../utils/FieldValidator')

exports.listThemAll = async (req, res) => {
  try {
    const sql = await database
      .select([
        'lessons.id',
        'lessons.title',
        'lessons.description',
        'lessons.link',
        'teachers.name as teacher',
        'cursoId'
      ])
      .from('lessons')
      .innerJoin('teachers', 'teachers.id', 'lessons.teacher')

    return res.status(200).send({
      lessons: sql
    })
  } catch (error) {
    return res.status(500).send({ error: error?.message || e })
  }
}

exports.create = async (req, res) => {
  try {
    const lessons = req.body
    if (!Object.keys(lessons).length) {
      return res.status(400).send({
        status: 'Corpo não enconstrado'
      })
    } else if (Object.keys(lessons).length < 5) {
      return res.status(400).send({
        status: `N° de campos não encostrados ${
          5 - Number(Object.keys(lessons).length)
        }`
      })
    }
    const invalidFields = fieldValidator(lessons, [
      'title',
      'description',
      'link',
      'teacher',
      'cursoId'
    ]) //Validação, é enviado parâmetros válidos para comparação
    if (invalidFields.length) {
      return res.status(400).send({
        status: 'Parâmetros inválidos',
        invalidFields
      })
    }
    //Depois de TODAS AS CHECAGEMS, ele vai ver se existe o professor e o curso

    console.log('... 1 ', lessons)
    console.log('... 2 ', lessons)
    const aaa = await database
      .select('*')
      .from('teachers')
      .where({ id: lessons.teacher })
    if (!aaa.length) {
      console.log('aasdasdadsasdasdasdasdasdasda')
    }

    //await database('lessons').insert(req.body);

    return res.status(200).send({
      status: 'success'
    })
  } catch (error) {
    return res.status(500).send({ error: error?.message || e })
  }
}

exports.getById = async (req, res) => {
  try {
    const params = req.params

    const [previousLesson] = await database
      .select('*')
      .from('lessons')
      .where({ id: params.id })
      .limit(1)

    if (!previousLesson) {
      return res
        .status(404)
        .send(`O registro com id: ${params.id} não foi encontrado!`)
    }
    return res.status(200).send({ data: previousLesson })
  } catch (error) {
    return res.status(500).send({ error: error?.message || e })
  }
}

exports.delete = async (req, res) => {
  try {
    const params = req.params

    const [previousLesson] = await database
      .select('*')
      .from('lessons')
      .where({ id: params.id })
      .limit(1)

    if (!previousLesson) {
      return res
        .status(404)
        .send(`O registro com id: ${params.id} não foi encontrado!`)
    }

    const nextLesson = req.body

    await database
      .delete({ title: nextLesson.title })
      .from('lessons')
      .where({ id: previousLesson.id })

    return res.status(200).send({ status: 'Registro removido com sucesso' })
  } catch (error) {
    return res.status(500).send({ error: error?.message || e })
  }
}

exports.update = async (req, res) => {
  try {
    const lessons = req.body
    const invalidFields = fieldValidator(lessons, [
      'title',
      'description',
      'link',
      'teacher',
      'cursoId'
    ]) //Validação, é enviado parâmetros válidos para comparação

    if (invalidFields.length) {
      return res.status(400).send({
        status: 'invalid request',
        invalidFields
      })
    }

    const params = req.params

    const [previousLesson] = await database
      .select('*')
      .from('authors')
      .where({ id: params.id })
      .limit(1)

    if (!previousLesson) {
      return res
        .status(404)
        .send(`O registro com id: ${params.id} não foi encontrado!`)
    }

    const nextLesson = req.body

    await database
      .update({ title: nextLesson.title })
      .from('authors')
      .where({ id: previousLesson.id })

    return res.status(200).send({ status: 'Registro removido com sucesso' })
  } catch (error) {
    return res.status(500).send({ error: error?.message || e })
  }
}
