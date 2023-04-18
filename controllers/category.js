import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getCategories = async (req, res, next) => {
  const { name, slug } = req.query;
  try {
    const categories = await prisma.Category.findMany({
      where: {
        name: { contains: name || "" },
        slug: { contains: slug || "" },
      },
      include: {
        products: {
          include: {
            product: true, // include the full data of the related post
          },
        },
      },
    });
    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
};
