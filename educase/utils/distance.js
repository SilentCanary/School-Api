function get_distance(latitude1,longitude1,latitude2,longitude2)
{
    const to_radians=x=>x*Math.PI/180;
    const R=6371;
    const dLat=to_radians(latitude2-latitude1);
    const dLon=to_radians(longitude2-longitude1);
    const a=
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(to_radians(latitude1)) * Math.cos(to_radians(latitude2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; 
}

module.exports=get_distance;