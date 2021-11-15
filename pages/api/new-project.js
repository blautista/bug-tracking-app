// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../prisma/db'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const projectData = req.body;
    let user;
    try {
      user = await prisma.project.create({
        data: {...projectData}
      });

      if (!user) throw new Error('Couldnt create new field in database');
    } catch(error) {
      res.status(409).json({message: error})
    }
    console.log(user);
    res.status(201).json({message: 'yay!'});
  }
}
