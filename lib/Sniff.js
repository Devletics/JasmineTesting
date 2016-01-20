
/*
# Represents one data point picked up by a sensor
# we have the sensor_id, the time the device was seen, and the device (phone, tablet, etc) id
*/

function Sniff(sensor_id, time, device_id) {
    this.sensor_id = sensor_id;
    this.time = time;
    this.device_id = device_id;
}

module.exports = Sniff;