import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getProducts = async (req, res, next) => {
  const { name, slug, subtitle } = req.query;
  try {
    const products = await prisma.product.findMany({
      where: {
        name: { contains: name || "" },
        slug: { contains: slug || "" },
        subtitle: { contains: subtitle || "" },
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};
export const getRelatedProducts = async (req, res, next) => {
  const { slug } = req.query;
  try {
    const products = await prisma.product.findMany({
      where: {
        slug: { not: slug },
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};
