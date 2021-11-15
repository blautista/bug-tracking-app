import prisma from '../../prisma/db'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    
    const data = req.body;
    let lastIssueInProject;

    try {
      lastIssueInProject = await prisma.issue.aggregate({
        where: {
          projectTitle: data.projectTitle,
        },
        _max: {
          number: true,
        }
      })
    } catch (error) {
      console.log(error.message);
    }

    data.number = lastIssueInProject['_max'].number + 1;

    try {
      await prisma.issue.create({
        data: {...data}
      });
    } catch(error) {
      console.log(error.message);
      res.status(409).json({message: 'Error creating new issue. Please try again later'});
      return;
    }
    res.status(201).json({message: 'yay!'});
  }
}
