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
  async updateRole(req, res) {
    try {
      const { docId } = req.query;
      const { ...roleDetails } = req.body;

      await Document.updateOne({ _id: docId, userId: req.userId }, roleDetails);

      return {
        error: false,
        message: "Roles updated successfully",
      };
    } catch (err) {
      return {
        error: true,
        message: err,
      };
    }
  }

  async getDocAccessUsers(req, res) {
    try {
      const { docId } = req.query;

      const result = await Document.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'shared.userId',
            foreignField: '_id',
            as: 'sharedUsers'
          }
        },
        {
          $match:{
            $and:[ { _id: docId, userId: req.userId }]
          }
        },
        {
          $addFields: {
            shared: {
              $map: {
                input: '$shared',
                as: 'sharedItem',
                in: {
                  $mergeObjects: [
                    '$$sharedItem',
                    {
                      user: {
                        $arrayElemAt: [
                          {
                            $filter: {
                              input: '$sharedUsers',
                              as: 'user',
                              cond: {
                                $eq: ['$$user._id', '$$sharedItem.userId']
                              }
                            }
                          },
                          0
                        ]
                      }
                    }
                  ]
                }
              }
            }
          }
        },
        {
          $project: {
            sharedUsers: 0,
            data: 0,
            'shared.user.googleId': 0
          }
        },
      ])

      let response = {
        docAccess:{
          ...result[0].docAccess
        },
        shared: result[0].shared.map(i => {
            return {
              email: i.user.email,
              firstname: i.user.firstname,
              lastname: i.user.lastname,
              image: i.user.image,
              role: i.role,
              userId: i.userId
            }
          })
      }

      return {
        error: false,
        data: response,
        message: "Access users successfully loaded",
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
