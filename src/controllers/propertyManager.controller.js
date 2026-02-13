// src/controllers/propertyManager.controller.js
import pkg from '../generated/prisma/client.js';
const { prisma } = pkg;

// Create a new property
export const createPropertyHandler = async (req, res) => {
  try {
    const {
      title,
      description,
      address,
      city,
      state,
      pricingUnit,
      basePrice,
      categoryId,
      managerId,
    } = req.body;

    const property = await prisma.properties.create({
      data: {
        title,
        description,
        address,
        city,
        state,
        pricing_unit: pricingUnit,
        base_price: basePrice,
        category_id: categoryId || null,
        manager_id: managerId,
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Property created successfully',
      data: property,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      data: { message: err.message },
    });
  }
};

// Get all properties
export const getPropertiesHandler = async (req, res) => {
  try {
    const properties = await prisma.properties.findMany({
      include: {
        property_images: true,
        categories: true,
      },
    });

    return res.json({
      success: true,
      message: 'Properties fetched successfully',
      data: properties,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      data: { message: err.message },
    });
  }
};

// Update a property by ID
export const updatePropertyHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      address,
      city,
      state,
      pricingUnit,
      basePrice,
      categoryId,
    } = req.body;

    const updatedProperty = await prisma.properties.update({
      where: { id },
      data: {
        title,
        description,
        address,
        city,
        state,
        pricing_unit: pricingUnit,
        base_price: basePrice,
        category_id: categoryId || null,
      },
    });

    return res.json({
      success: true,
      message: 'Property updated successfully',
      data: updatedProperty,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      data: { message: err.message },
    });
  }
};

// Delete a property by ID
export const deletePropertyHandler = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.properties.delete({ where: { id } });

    return res.json({
      success: true,
      message: 'Property deleted successfully',
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      data: { message: err.message },
    });
  }
};

// Upload a property image
export const uploadPropertyImageHandler = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image uploaded',
      });
    }

    const image = await prisma.property_images.create({
      data: {
        property_id: id,
        image_url: req.file.path,
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Image uploaded successfully',
      data: image,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      data: { message: err.message },
    });
  }
};
