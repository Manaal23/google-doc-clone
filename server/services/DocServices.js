const Document = require("../models/Document");

class DocServices{

    async getDocs(req, res){
        let docList = await Document.find({ userId: req.userId}).select({ _id: 1})
        return {
            error: false,
            data: docList,
            message: 'Loaded successfully'
        }
    }


}
module.exports = new DocServices();