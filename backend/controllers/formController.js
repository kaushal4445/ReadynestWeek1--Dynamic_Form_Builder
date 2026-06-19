const Form = require("../models/Form");

const createForm = async (req, res) => {
  try {
    const { title, description, fields } = req.body;

    const form = new Form({
      title,
      description,
      fields,
      user: req.user.id,
    });

    await form.save();

    res.status(201).json({
      success: true,
      form,
    });
  } catch (error) {
    console.log("ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getForms = async (req, res) => {
  try {
    const forms = await Form.find({
      user: req.user.id,
    });

    res.status(200).json({
      success: true,
      forms,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateForm = async (req, res) => {
  try {
    const { title, description, fields } = req.body;

    const form = await Form.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        fields,
      },
      { new: true }
    );

    if (!form) {
      return res.status(404).json({
        success: false,
        message: "Form not found",
      });
    }

    res.status(200).json({
      success: true,
      form,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE FORM
const getFormById = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);

    if (!form) {
      return res.status(404).json({
        message: "Form not found",
      });
    }

    res.status(200).json(form);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createForm,
  getForms,
  getFormById,
  updateForm,
};