const DocServices = require("../services/DocServices");

class DocumentController{
    async getDocs (req, res) {
        const response = await DocServices.getDocs(req, res);
        res.status(response.error ? 400 : 201).send(response)
    }

    async deleteDoc(req, res){
        const response = await DocServices.deleteDoc(req, res);
        res.status(response.error ? 400 : 201).send(response)
    }
    async updateRole(req, res){
        const response = await DocServices.updateRole(req, res);
        res.status(response.error ? 400 : 201).send(response)
    }
    async getDocAccessUsers(req, res){
        const response = await DocServices.getDocAccessUsers(req, res);
        res.status(response.error ? 400 : 201).send(response)
    }
}

module.exports = new DocumentController();