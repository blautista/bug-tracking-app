import prisma from '../../prisma/db'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    
    const data = req.body;

    try {
      await prisma.comment.create({
        data: data,
      });
      res.status(201).json({message: 'Comment inserted succesfully'});
    } catch (error) {
      console.log(error.message);
      res.status(409).json({message: 'Error creating new comment. Please try again later'});
    }  
  }
}
