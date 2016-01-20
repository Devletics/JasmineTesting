function TravelTime() {
}

/*
# computes the average travel time (as an integer number of milliseconds) from some point a (where start_sensors are located) to point b (where end_sensors are located)
# for a given range of time (start_time to end_time) for example from 6 AM to 7 AM
# you should use the last time a device was seen at the start beacons and the first time they were seen at the end beacons
#
# arguments: sniffs (an array of sniff objects)
# start_time (exclude sniffs before this)
# end_time (exclude sniffs after this)
# start_sensors (an array of sensors which are located at the start)
# end_sensors (an array of sensors which are located at the end)
#
# Note: You can get the fractional seconds from a DateTime using to_f (definition in date_time.rb)
*/

// Check if sniff is between time range
function isSniffBetweenTimeRange(sniff, start_time, end_time) {
  var afterStartTime = sniff.time.getTime() > start_time.getTime();
  var beforeEndTime =  end_time.getTime() > sniff.time.getTime();
  return afterStartTime && beforeEndTime;
}

// Checks if the sniff matches any of the sensors
function sensorCheck(sniff, sensors) {
  return !!sensors.filter(function(sensorId) {
    return sniff.sensor_id === sensorId;
  }).length;
}

// Averages the time of all the sniffs
function averageSniffTime(sniffs) {
  return sniffs.reduce(function(last, nextSniff) {
      return last + nextSniff.time.getTime();
    }, 0) / sniffs.length;
}

TravelTime.average = function(sniffs, start_time, end_time, start_sensors, end_sensors) {
  var firstSniffs = sniffs.filter(function(sniff) {
    return isSniffBetweenTimeRange(sniff, start_time, end_time) && sensorCheck(sniff, start_sensors);
  });

  var lastSniffs = sniffs.filter(function(sniff) {
    return isSniffBetweenTimeRange(sniff, start_time, end_time) && sensorCheck(sniff, end_sensors);
  });

  if(!firstSniffs.length || !lastSniffs.length) {
    return null;
  }

  var avgFirstTime = averageSniffTime(firstSniffs);
  var avgLastTime = averageSniffTime(lastSniffs);
  var timeDiff = avgLastTime - avgFirstTime;

  if (timeDiff < 0) {
    return null;
  }

  return timeDiff;
}

module.exports = TravelTime;
