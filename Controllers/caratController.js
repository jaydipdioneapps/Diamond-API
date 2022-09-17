const caratcounter = require("../Models/caratcounter");
const Item_master = require("../Models/item_master");

exports.get_carat = async function (req, res, next) {
  try {
    let newArry = [];
    let newdata = await caratcounter.find();
    for (let i = 0; i < newdata.length; i++) {
      let lotdata = await item_master.findOne(
        { refno: newdata[i].refno },
        {
          // lotno: 1,
          // pcs: 1
        }
      );
      // console.log(lotdata);
      let newObj = {
        refno: newdata[i].refno,
        lotno: lotdata.lotno,
        kapan: lotdata.kapan,
        rate: lotdata.asking_rate,
        total_carat:
          newdata[i].purchase +
          newdata[i].memo_in -
          newdata[i].sale -
          newdata[i].memo_out,
        pcs: newdata[i].pcs,
      };
      newArry.push(newObj);
    }
    // newdata.map(async (e, i) => {
    // })
    res.status(200).json({
      status: "200",
      newArry,
    });
  } catch (err) {
    res.status(200).json({
      status: "500",
      message: err.message,
    });
  }
};

exports.stockReport = async function (req, res) {
  try {
    let filteredPur = await caratcounter.aggregate([
      {
        $match: {
          $and: [
            req.body.refnoList.length
              ? {
                  refno: { $in: req.body.refnoList },
                }
              : {},
          ],
        },
      },
    ]);

    let filteredPur_ref_array = [];
    filteredPur.map((item) => {
      filteredPur_ref_array.push(item.refno);
    });
    let filtered_Item_master = await Item_master.aggregate([
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
            { refno: { $in: filteredPur_ref_array } },
            req.body.kapan.length
              ? { kapan: { $in: req.body.kapan } }
              : {},
            req.body.color.length
              ? { "color.color": { $in: req.body.color } }
              : {},
            req.body.shape.length
              ? { "shape.name": { $in: req.body.shape } }
              : {},
            req.body.clarity.length
              ? { "clarity.name": { $in: req.body.clarity } }
              : {},
            req.body.color.length
              ? { "color.intensity": { $in: req.body.intensity } }
              : {},
            req.body.labs.length ? { "type.name": { $in: req.body.labs } } : {},
            req.body.fluorescence.length
              ? { fl_intensity: { $in: req.body.fluorescence } }
              : {},
            req.body.cut.length ? { cut: { $in: req.body.cut } } : {},
            req.body.polish.length ? { polish: { $in: req.body.polish } } : {},
            req.body.symmetry.length
              ? { symmetry: { $in: req.body.symmetry } }
              : {},
            req.body.fluorescence.length
              ? { fl_color: { $in: req.body.fluorescenceColor } }
              : {},
            req.body.girdle.length ? { girdle: { $in: req.body.girdle } } : {},
            req.body.certId
              ? req.body.certId.split(",").length
                ? { certificate_no: { $in: req.body.certId.split(",") } }
                : {}
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
    let filtered_Item_ref_array = [];
    filtered_Item_master.map((item) => {
      filtered_Item_ref_array.push(item.refno);
    });

    let final_filtered_data = [];
    filtered_Item_master.map((Item_entry) => {
      // console.log(Item_entry);
      filteredPur.map((pur_entry) => {
        if (pur_entry.refno === Item_entry.refno) {
          pur_entry.Item_entry = {
            _id: Item_entry._id,
            type: Item_entry.type[0],
            refno: Item_entry.refno,
            color: Item_entry.color[0],
            clarity: Item_entry.clarity[0],
            shape: Item_entry.shape[0],
            size: Item_entry.size[0],
            lotno: Item_entry.lotno,
            kapan: Item_entry.kapan,
            asking_rate: Item_entry.asking_rate,
            cost: Item_entry.cost,
            stock_value: Item_entry.stock_value,
            remarks: Item_entry.remarks,
            responsibility: Item_entry.responsibility,
            pair: Item_entry.pair,
            certificate_no: Item_entry.certificate_no,
            length: Item_entry.length,
            width: Item_entry.width,
            depth: Item_entry.depth,
            depth_pct: Item_entry.depth_pct,
            table_pct: Item_entry.table_pct,
            cut: Item_entry.cut,
            polish: Item_entry.polish,
            symmetry: Item_entry.symmetry,
            fl_intensity: Item_entry.fl_intensity,
            fl_color: Item_entry.fl_color,
            inscription: Item_entry.inscription,
            girdle: Item_entry.girdle,
            girdle_condition: Item_entry.girdle_condition,
            girdle_pct: Item_entry.girdle_pct,
            culet_size: Item_entry.culet_size,
            key_to_symbols: Item_entry.key_to_symbols,
            report_date: Item_entry.report_date,
            report_comments: Item_entry.report_comments,
            crn_ag: Item_entry.crn_ag,
            crn_ht: Item_entry.crn_ht,
            pav_ag: Item_entry.pav_ag,
            pav_dp: Item_entry.pav_dp,
            str_ln: Item_entry.str_ln,
            lr_half: Item_entry.lr_half,
            current_date: Item_entry.current_date,
            current_time: Item_entry.current_time,
            user_id: Item_entry.user_id,
            branch_id: Item_entry.branch_id,
            master_country_id: Item_entry.master_country_id,
            __v: Item_entry.__v,
          };
          // pur_entry.Item_entry = Item_entry;
          Item_entry;
          final_filtered_data.push(pur_entry);
        }
      });
    });

    res.status(200).json({
      status: "successfully",
      //   filteredPur,
      filtered_Item_master,
      // final_filtered_data,
    });
  } catch (err) {
    res.status(200).json({
      status: "500",
      message: err.message,
    });
  }
};
