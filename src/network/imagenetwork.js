const Controller = require('../controllers/imagecontrollers')
const express = require('express')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const router = express.Router()

    async function onNewImage(request, response){
        const file = request.file; 
        const result = await Controller.onNewImages(file.path)
        response.send(result)
    }

    async function onDeleteImages(request, response) {
        const imageId = request.params.imageId
        const result = await Controller.onDeleteImages(imageId)
        response.send(result.data)
    }

    async function getImageUrl(request, response) {
        const { imageId, variant } = request.params;
        const result = await Controller.getImageUrl(imageId, variant);
        response.send(result);
    }
    
    async function listImages(request, response) {
    try {
        const result = await Controller.listAllImages();
        response.json(result);
    } catch (error) {
        response.status(500).json({ error: "Error al listar imágenes" });
    }
    }
    router.get("/", listImages);
 
router.get("/:imageId/:variant", getImageUrl);
router.post("/upload", upload.single('file'), onNewImage)
router.delete("/delete/:imageId", onDeleteImages)

module.exports = router
