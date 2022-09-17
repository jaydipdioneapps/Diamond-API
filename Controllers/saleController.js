const mongoose = require("mongoose");
const sale_Entry = require("../Models/sale_entry");
const moment = require("moment");
const caratcounter = require("../Models/caratcounter");
const Item_entry = require("../Models/item_master");

exports.saleEntry = async function (req, res, next) {
    try {
        // let data = {
        //     date: req.body.date,
        //     purchaser: req.body.inv_type,
        //     currency: req.body.currency,
        //     curr_rate: req.body.curr_rate,
        //     bill_no: req.body.bill_no,
        //     Invoice_no: req.body.Invoice_no,
        //     party: req.body.party,
        //     broker: req.body.broker,
        //     due_days: req.body.due_days,
        //     due_date: req.body.due_date,
        //     over_due: req.body.over_due,
        //     over_due_date: req.body.over_due_date,
        //     type: req.body.type,
        //     p_r_type: req.body.p_r_type,
        //     adat: req.body.adat,
        //     adat_amt: req.body.adat_amt,
        // };
        // let data = req.body;
        let addData = await sale_Entry.create(req.body);

        let trans_entries = req.body.trans_entries;
        let old = [];
        let sortEdData = [];
        trans_entries.map((e) => {

            let arry = old.filter((x) => x == e.refno);
            if (arry.length) {
                let num = sortEdData.findIndex((x) => x.refno == e.refno);
                sortEdData[num].carat = sortEdData[num].carat + e.carat;
                sortEdData[num].pcs = sortEdData[num].pcs + e.pcs;
            } else {
                old.push(e.refno);
                sortEdData.push(e);
            }
        })

        sortEdData.map(async (e) => {

            let updatedData = await caratcounter.findOne({ refno: e.refno });
            console.log(updatedData);
            updatedData.sale = updatedData.sale + e.carat;
            updatedData.pcs = updatedData.pcs - e.pcs;

            await caratcounter.findByIdAndUpdate(updatedData._id, updatedData)

        })
        res.status(200).json({
            status: "200",
            // sortEdData
            // addData,
            // data
        });
    } catch (err) {
        res.status(200).json({
            status: "500",
            message: err.message,
        });
    }
};

// exports.get_pur_saleEntry = async function (req, res, next) {
//     try {
//         // let data = req.body;
//         let Data = await pur_sale.find();
//         // var g = new Date();
//         // for (let i = 0; i < Data.length; i++) {
//         //     let eliment = moment(Data[i].due_date).format("l");
//         //     console.log(eliment);
//         // }
//         res.status(200).json({
//             status: "200",
//             data: Data,
//         });
//     } catch (err) {
//         res.status(200).json({
//             status: "500",
//             message: err.message,
//         });
//     }
// };

exports.get_entry = async function (req, res, next) {
    try {
        let newdata
        if (req.params.type == 'bill') {
            newdata = await sale_Entry.find({ bill_no: req.params.no });
        } else if (req.params.type == 'inv') {
            newdata = await sale_Entry.find({ inv_no: req.params.no });
        }
        res.status(200).json({
            status: "200",
            addData: newdata,
        });
    } catch (err) {
        res.status(200).json({
            status: "500",
            message: err.message,
        });
    }
};

exports.update_entry = async function (req, res, next) {
    try {
        let newdata
        if (req.params.type == 'bill') {
            newdata = await sale_Entry.findOneAndUpdate({ bill_no: req.params.no }, req.body);
        } else if (req.params.type == 'inv') {
            newdata = await sale_Entry.findOneAndUpdate({ inv_no: req.params.no }, req.body);
        }
        res.status(200).json({
            status: "200",
            data: newdata,
        });
    } catch (err) {
        res.status(200).json({
            status: "500",
            message: err.message,
        });
    }
};

exports.delete_entry = async function (req, res, next) {
    try {
        let newdata
        if (req.params.type == 'bill') {
            newdata = await sale_Entry.findOneAndDelete({ bill_no: req.params.no }, req.body);
        } else if (req.params.type == 'inv') {
            newdata = await sale_Entry.findOneAndDelete({ inv_no: req.params.no }, req.body);
        }
        res.status(200).json({
            status: "200",
            message: "delete successfully",
            deleted_data: newdata,
        });
    } catch (err) {
        res.status(200).json({
            status: "500",
            message: err.message,
        });
    }
};
exports.saleReport = async function (req, res) {
    try {
      // console.log(req.body.priceCt[0]);
  
      // console.log(req.body.priceCt[1]);
      // let body = req.body;
      // let filteredData =  sale_Entry.aggregate([
      let filteredSale = await sale_Entry.aggregate([
        { $unwind: "$trans_entries" },
        {
          $match: {
            $and: [
              req.body.carat[0] !== 0 && req.body.carat[1] !== 0
                ? {
                    "trans_entries.carat": {
                      $gte: req.body.carat[0],
                      $lte: req.body.carat[1],
                    },
                  }
                : {},
              req.body.from !== "" && req.body.to !== ""
                ? {
                    date: {
                      $gte: new Date(req.body.from),
                      $lte: new Date(req.body.to),
                    },
                  }
                : {},
              req.body.party !== ""
                ? {
                    party: req.body.party,
                  }
                : {},
              req.body.inv_no !== ""
                ? {
                    inv_no: req.body.inv_inv,
                  }
                : {},
              req.body.bill_no !== ""
                ? {
                    bill_no: req.body.bill_no,
                  }
                : {},
              req.body.saller !== ""
                ? {
                    name: req.body.saller,
                  }
                : {},
              req.body.type.length
                ? {
                    type: { $in: req.body.type },
                  }
                : {},
              req.body.kapan !== ""
                ? {
                    "trans_entries.kapan": req.body.kapan,
                  }
                : {},
              req.body.refnoList.length
                ? {
                    "trans_entries.refno": {
                      $in: req.body.refnoList,
                    },
                  }
                : {},
              req.body.priceCt[0] !== 0 && req.body.priceCt[1] !== 0
                ? {
                    "trans_entries.asking_rate": {
                      $gte: req.body.priceCt[0],
                      $lte: req.body.priceCt[1],
                    },
                  }
                : {},
            ],
            $expr: {
              $gte:
                req.body.amount[0] !== 0 && require.body.amount !== 0
                  ? [
                      {
                        $multiply: [
                          "$trans_entries.carat",
                          "$trans_entries.asking_rate",
                        ],
                      },
                      req.body.amount[0],
                    ]
                  : [{}, {}],
            },
            $expr: {
              $lte:
                req.body.amount[0] !== 0 && require.body.amount !== 0
                  ? [
                      {
                        $multiply: [
                          "$trans_entries.carat",
                          "$trans_entries.asking_rate",
                        ],
                      },
                      req.body.amount[1],
                    ]
                  : [{}, {}],
            },
          },
        },
      ]);
  
      let filteredSale_ref_array = [];
      filteredSale.map((item) => {
        filteredSale_ref_array.push(item.trans_entries.refno);
      });
      let filtered_Item_master = await Item_entry.aggregate([
        {
          $lookup: {
            from: "types",
            localField: "color",
            foreignField: "_id",
            as: "color",
          },
        },
        {
          $lookup: {
            from: "types",
            localField: "shape",
            foreignField: "_id",
            as: "shape",
          },
        },
        {
          $lookup: {
            from: "types",
            localField: "size",
            foreignField: "_id",
            as: "size",
          },
        },
        {
          $lookup: {
            from: "types",
            localField: "clarity",
            foreignField: "_id",
            as: "clarity",
          },
        },
        {
          $lookup: {
            from: "types",
            localField: "type",
            foreignField: "_id",
            as: "type",
          },
        },
        {
          $match: {
            $and: [
              { refno: { $in: filteredSale_ref_array } },
              req.body.color.length
                ? { "color.color": { $in: req.body.color } }
                : {},
              req.body.shape.length
                ? { "shape.name": { $in: req.body.shape } }
                : {},
              req.body.clarity.length
                ? { "clarity.name": { $in: req.body.clarity } }
                : {},
              req.body.intensity.length
                ? { "color.intensity": { $in: req.body.intensity } }
                : {},
              req.body.labs.length ? { "type.name": { $in: req.body.labs } } : {},
              req.body.fluorescence.length
                ? { fl_intensity: { $in: req.body.fluorescence } }
                : {},
              req.body.cut.length ? { cut: { $in: req.body.cut } } : {},
              req.body.symmetry.length ? { symmetry: { $in: req.body.symmetry } } : {},
              req.body.polish.length ? { polish: { $in: req.body.polish } } : {},
              req.body.fluorescenceColor.length
                ? { fl_color: { $in: req.body.fluorescenceColor } }
                : {},
              req.body.girdle.length ? { girdle: { $in: req.body.girdle } } : {},
              req.body.certId
                ? req.body.certId.split(",").length ? { certificate_no: { $in: req.body.certId.split(",") } } : {}
                : {},
  
              req.body.depth[0] !== 0 && req.body.depth[1] !== 0
                ? {
                    depth_pct: {
                      $gte: req.body.depth[0],
                      $lte: req.body.depth[1],
                    },
                  }
                : {},
  
              req.body.table[0] !== 0 && req.body.table[1] !== 0
                ? {
                    table_pct: {
                      $gte: req.body.table[0],
                      $lte: req.body.table[1],
                    },
                  }
                : {},
  
              req.body.measLength[0] !== 0 && req.body.measLength[1] !== 0
                ? {
                    length: {
                      $gte: req.body.measLength[0],
                      $lte: req.body.measLength[1],
                    },
                  }
                : {},
  
              req.body.measWidth[0] !== 0 && req.body.measWidth[1] !== 0
                ? {
                    width: {
                      $gte: req.body.measWidth[0],
                      $lte: req.body.measWidth[1],
                    },
                  }
                : {},
  
              req.body.measDepth[0] !== 0 && req.body.measDepth[1] !== 0
                ? {
                    depth: {
                      $gte: req.body.measDepth[0],
                      $lte: req.body.measDepth[1],
                    },
                  }
                : {},
  
              req.body.crownHeight[0] !== 0 && req.body.crownHeight[1] !== 0
                ? {
                    crn_ht: {
                      $gte: req.body.crownHeight[0],
                      $lte: req.body.crownHeight[1],
                    },
                  }
                : {},
  
              req.body.crownagle[0] !== 0 && req.body.crownagle[1] !== 0
                ? {
                    crn_ag: {
                      $gte: req.body.crownagle[0],
                      $lte: req.body.crownagle[1],
                    },
                  }
                : {},
  
              req.body.pavalionDapth[0] !== 0 && req.body.pavalionDapth[1] !== 0
                ? {
                    pav_dp: {
                      $gte: req.body.pavalionDapth[0],
                      $lte: req.body.pavalionDapth[1],
                    },
                  }
                : {},
  
              req.body.pavalionAngle[0] !== 0 && req.body.pavalionAngle[1] !== 0
                ? {
                    pav_ag: {
                      $gte: req.body.pavalionAngle[0],
                      $lte: req.body.pavalionAngle[1],
                    },
                  }
                : {},
            ],
          },
        },
      ]);
    //   let filtered_Item_ref_array =[];
    //   filtered_Item_master.map((item) => {
    //     filtered_Item_ref_array.push(item.refno);
    //   });
  
      let final_filtered_data = [];
      filtered_Item_master.map((Item_entry) => {
        // console.log(Item_entry);
        filteredSale.map((pur_entry) => {
          if (pur_entry.trans_entries.refno === Item_entry.refno) {
            pur_entry.Item_entry = {
              _id: Item_entry._id,
              type: Item_entry.type[0],
              refno: Item_entry.refno,
              color: Item_entry.color[0],
              clarity: Item_entry.clarity[0],
              shape: Item_entry.shape[0],
              size: Item_entry.size[0],
              lotno : Item_entry.lotno,
              kapan : Item_entry.kapan,
              asking_rate : Item_entry.asking_rate,
              cost : Item_entry.cost,
              stock_value : Item_entry.stock_value,
              remarks : Item_entry.remarks,
              responsibility : Item_entry.responsibility,
              pair : Item_entry.pair,
              certificate_no : Item_entry.certificate_no,
              length : Item_entry.length,
              width : Item_entry.width,
              depth : Item_entry.depth,
              depth_pct : Item_entry.depth_pct,
              table_pct : Item_entry.table_pct,
              cut : Item_entry.cut,
              polish : Item_entry.polish,
              symmetry : Item_entry.symmetry,
              fl_intensity : Item_entry.fl_intensity,
              fl_color : Item_entry.fl_color,
              inscription : Item_entry.inscription,
              girdle : Item_entry.girdle,
              girdle_condition : Item_entry.girdle_condition,
              girdle_pct : Item_entry.girdle_pct,
              culet_size : Item_entry.culet_size,
              key_to_symbols : Item_entry.key_to_symbols,
              report_date : Item_entry.report_date,
              report_comments : Item_entry.report_comments,
              crn_ag : Item_entry.crn_ag,
              crn_ht : Item_entry.crn_ht,
              pav_ag : Item_entry.pav_ag,
              pav_dp : Item_entry.pav_dp,
              str_ln : Item_entry.str_ln,
              lr_half : Item_entry.lr_half,
              current_date : Item_entry.current_date,
              current_time : Item_entry.current_time,
              user_id : Item_entry.user_id,
              branch_id : Item_entry.branch_id,
              master_country_id : Item_entry.master_country_id,
              __v : Item_entry.__v,
            };
            // pur_entry.Item_entry = Item_entry;
            Item_entry;
            final_filtered_data.push(pur_entry);
          }
        });
      });
  
      res.status(200).json({
        status: "successfully",
        // filteredSale,
        // filtered_Item_master,
        final_filtered_data,
      });
    } catch (err) {
      res.status(200).json({
        status: "500",
        message: err.message,
      });
    }
  };
  