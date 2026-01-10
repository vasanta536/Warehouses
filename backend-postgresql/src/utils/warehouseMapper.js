function mapWarehouses(rows) {
  return rows.map(w => ({
    id: w.id,
    name: w.name,
    address1: w.address1,
    address2: w.address2,
    stateName: w.statename,   
    pincode: w.pincode,
    plotArea: w.plotarea,
    noOfDocs: w.noofdocs,
    storageHeight: w.storageheight,
    frontViewImage: w.frontviewimage,
    gateViewImage: w.gateviewimage,
    coveredAreaImage: w.coveredareaimage,
    outsideImage: w.outsideimage,
    area: w.area,
    city: w.city,
    gstNo: w.gstno,
    coveredArea: w.coveredarea,
    noOfGate: w.noofgate,
    parkingArea: w.parkingarea,
    createdAt: w.created_at
  }));
}

module.exports = { mapWarehouses };
