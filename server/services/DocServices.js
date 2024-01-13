const Document = require("../models/Document");

class DocServices {
  async getDocs(req, res) {
    let docList = await Document.find({ userId: req.userId }).select({
      _id: 1,
      title: 1
    });
    return {
      error: false,
      data: docList,
      message: "Loaded successfully",
    };
  }

  async deleteDoc(req, res) {
    try {
      const { docId } = req.body;
      await Document.deleteOne({ _id: docId });

      return {
        error: false,
        message: "deleted successfully",
      };
    } catch (err) {
      return {
        error: true,
        message: err,
      };
    }
  }
}
module.exports = new DocServices();
