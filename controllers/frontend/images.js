const Image = require("../../models/image")

exports.getImage = async (req, res, next) => {
    try {
        const imageId = req.params.imageId;
        const image = await Image.findById(imageId);

        res.set("Cache-control", "public, max-age=31536000");
        res.contentType(image.mimetype);
        res.send(Buffer.from(image.buffer, "binary"));

    } catch (error) {
        return res.status(error.statusCode || 404).json({ error: error.message });
    }

}