describe("TravelTime", function() {
  var TravelTime = require('../../lib/TravelTime');
  var Sniff = require('../../lib/Sniff');

  it("returns the travel time in integer milliseconds", function() {
      var sniffs = [new Sniff(1, new Date(2015, 7, 22, 2, 30), "00:00:00:00:00:00"),
                    new Sniff(2, new Date(2015, 7, 22, 2, 50), "00:00:00:00:00:00")];

      start_time = new Date(2015, 7, 22, 2, 0);

      end_time = new Date(2015, 7, 22, 3, 0);

      start_sensors = [1];

      end_sensors = [2];

      expect(TravelTime.average(sniffs, start_time, end_time, start_sensors, end_sensors)).toEqual(20*60*1000);
  });

  it("ignores backward travel time and returns nil", function() {
      sniffs = [new Sniff(2, new Date(2015, 7, 22, 2, 30), "00:00:00:00:00:00"),
                new Sniff(1, new Date(2015, 7, 22, 2, 50), "00:00:00:00:00:00")];

      start_time = new Date(2015, 7, 22, 2, 0);

      end_time = new Date(2015, 7, 22, 3, 0);

      start_sensors = [1];

      end_sensors = [2];

      expect(TravelTime.average(sniffs, start_time, end_time, start_sensors, end_sensors)).toEqual(null)
  });

  it("returns nil", function() {
      sniffs = [new Sniff(2, new Date(2015, 7, 22, 2, 30), "00:00:00:00:00:00")];

      start_time = new Date(2015, 7, 22, 2, 0);

      end_time = new Date(2015, 7, 22, 3, 0);

      start_sensors = [1];

      end_sensors = [2];

      expect(TravelTime.average(sniffs, start_time, end_time, start_sensors, end_sensors)).toEqual(null);
  });

  it("ignores sniffs out of the time ranges", function() {
      sniffs = [new Sniff(1, new Date(2015, 7, 22, 1, 50), "00:00:00:00:00:01"),
                new Sniff(2, new Date(2015, 7, 22, 1, 55), "00:00:00:00:00:01"),
                new Sniff(1, new Date(2015, 7, 22, 2, 10), "00:00:00:00:00:02"),
                new Sniff(2, new Date(2015, 7, 22, 2, 30), "00:00:00:00:00:02"),
                new Sniff(1, new Date(2015, 7, 22, 3, 10), "00:00:00:00:00:03"),
                new Sniff(2, new Date(2015, 7, 22, 3, 15), "00:00:00:00:00:03")];

      start_time = new Date(2015, 7, 22, 2, 0);

      end_time = new Date(2015, 7, 22, 3, 0);

      start_sensors = [1];

      end_sensors = [2];

      expect(TravelTime.average(sniffs, start_time, end_time, start_sensors, end_sensors)).toEqual(20*60*1000);
  });

  it("ignores sniffs from other beacons", function() {
      sniffs = [new Sniff(1, new Date(2015, 7, 22, 2, 10), "00:00:00:00:00:00"),
                new Sniff(3, new Date(2015, 7, 22, 2, 20), "00:00:00:00:00:00"),
                new Sniff(2, new Date(2015, 7, 22, 2, 30), "00:00:00:00:00:00")];

      start_time = new Date(2015, 7, 22, 2, 0);

      end_time = new Date(2015, 7, 22, 3, 0);

      start_sensors = [1];

      end_sensors = [2];

      expect(TravelTime.average(sniffs, start_time, end_time, start_sensors, end_sensors)).toEqual(20*60*1000);
  });

  it("correctly average travel time", function() {
      sniffs = [new Sniff(1, new Date(2015, 7, 22, 1, 50), "00:00:00:00:00:01"),
                new Sniff(2, new Date(2015, 7, 22, 1, 55), "00:00:00:00:00:01"),
                new Sniff(1, new Date(2015, 7, 22, 2, 10), "00:00:00:00:00:02"),
                new Sniff(2, new Date(2015, 7, 22, 2, 30), "00:00:00:00:00:02")];

      start_time = new Date(2015, 7, 22, 1, 0);

      end_time = new Date(2015, 7, 22, 3, 0);

      start_sensors = [1];

      end_sensors = [2];

      expect(TravelTime.average(sniffs, start_time, end_time, start_sensors, end_sensors)).toEqual((20+5.0)/2*60*1000);
  });
});