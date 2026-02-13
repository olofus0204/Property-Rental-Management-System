import pkg from '../generated/prisma/client.js';
const { prisma } = pkg;

export const createProperty = async (userId, data) => {
  return prisma.properties.create({
    data: { ...data, manager_id: userId },
  });
};

export const getProperties = async (userId) => {
  return prisma.properties.findMany({
    where: { manager_id: userId },
    include: { property_images: true },
  });
};

export const updateProperty = async (userId, propertyId, data) => {
  return prisma.properties.updateMany({
    where: { id: propertyId, manager_id: userId },
    data,
  });
};

export const deleteProperty = async (userId, propertyId) => {
  return prisma.properties.deleteMany({
    where: { id: propertyId, manager_id: userId },
  });
};

export const uploadPropertyImage = async (userId, propertyId, file) => {
  // just store file URL
  const imageUrl = `/uploads/${file.filename}`;
  return prisma.property_images.create({
    data: { property_id: propertyId, image_url: imageUrl },
  });
};
