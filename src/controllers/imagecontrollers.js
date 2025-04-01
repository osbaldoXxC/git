const CloudFlare = require('../services/cloudflare');

async function onNewImages(path) {
    const cloudFlare = CloudFlare.getInstance();
    const result = await cloudFlare.uploadImage(path);
    
  
    return {
        id: result.id,
        variants: result.variants, 
        filename: result.filename,
        uploaded: new Date().toISOString()
    };
}

function onDeleteImages(imageId){
    const cloudFlare = CloudFlare.getInstance();
    return cloudFlare.deleteImage(imageId);
}
function getImageUrl(imageId, variant) {
    const cloudFlare = CloudFlare.getInstance();
    return {
        url: cloudFlare.getImageUrl(imageId, variant),
        imageId,
        variant
    };
}
async function listAllImages() {
    const cloudFlare = CloudFlare.getInstance();
    const images = await cloudFlare.listImages();
    
    return images.map(image => ({
        id: image.id,
        url_chica: cloudFlare.getImageUrl(image.id, "chica") 
    }));
}

module.exports = {
    onNewImages, 
    onDeleteImages,
    getImageUrl,
    listAllImages
}