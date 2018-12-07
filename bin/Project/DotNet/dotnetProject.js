'use strict';

var spawn = require('child_process').spawn;
var executablePath = require.resolve('./Build/dotnet');

var dotnetProject = {};

dotnetProject.build = function (root, fileDir) {
    console.log('Building dotnet project');
    var dotnet = spawn('node', [executablePath, '/root:' + root, '/type:build', '/arguments:restore'], { cwd: fileDir });
    dotnet.stdout.on('data', function (data) {
        console.log(data.toString());
    });

    dotnet.stderr.on('data', function (data) {
        console.log(data.toString());
    });
    return dotnet;
};

module.exports = dotnetProject;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1NvdXJjZS9Qcm9qZWN0L0RvdE5ldC9kb3RuZXRQcm9qZWN0LmpzIl0sIm5hbWVzIjpbInNwYXduIiwicmVxdWlyZSIsImV4ZWN1dGFibGVQYXRoIiwicmVzb2x2ZSIsImRvdG5ldFByb2plY3QiLCJidWlsZCIsInJvb3QiLCJmaWxlRGlyIiwiY29uc29sZSIsImxvZyIsImRvdG5ldCIsImN3ZCIsInN0ZG91dCIsIm9uIiwiZGF0YSIsInRvU3RyaW5nIiwic3RkZXJyIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFNQSxRQUFRQyxRQUFRLGVBQVIsRUFBeUJELEtBQXZDO0FBQ0EsSUFBTUUsaUJBQWlCRCxRQUFRRSxPQUFSLENBQWdCLGdCQUFoQixDQUF2Qjs7QUFFQSxJQUFJQyxnQkFBZ0IsRUFBcEI7O0FBRUFBLGNBQWNDLEtBQWQsR0FBc0IsVUFBQ0MsSUFBRCxFQUFPQyxPQUFQLEVBQW1CO0FBQ3JDQyxZQUFRQyxHQUFSLENBQVkseUJBQVo7QUFDQSxRQUFJQyxTQUFTVixNQUFNLE1BQU4sRUFBYyxDQUFDRSxjQUFELGFBQTBCSSxJQUExQixFQUFrQyxhQUFsQyxFQUFpRCxvQkFBakQsQ0FBZCxFQUFzRixFQUFDSyxLQUFLSixPQUFOLEVBQXRGLENBQWI7QUFDQUcsV0FBT0UsTUFBUCxDQUFjQyxFQUFkLENBQWlCLE1BQWpCLEVBQXlCLFVBQUNDLElBQUQsRUFBVTtBQUMvQk4sZ0JBQVFDLEdBQVIsQ0FBWUssS0FBS0MsUUFBTCxFQUFaO0FBQ0gsS0FGRDs7QUFJQUwsV0FBT00sTUFBUCxDQUFjSCxFQUFkLENBQWlCLE1BQWpCLEVBQXlCLFVBQUNDLElBQUQsRUFBVTtBQUMvQk4sZ0JBQVFDLEdBQVIsQ0FBWUssS0FBS0MsUUFBTCxFQUFaO0FBQ0gsS0FGRDtBQUdBLFdBQU9MLE1BQVA7QUFDSCxDQVhEOztBQWFBTyxPQUFPQyxPQUFQLEdBQWlCZCxhQUFqQiIsImZpbGUiOiJkb3RuZXRQcm9qZWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc3Bhd24gPSByZXF1aXJlKCdjaGlsZF9wcm9jZXNzJykuc3Bhd247XG5jb25zdCBleGVjdXRhYmxlUGF0aCA9IHJlcXVpcmUucmVzb2x2ZSgnLi9CdWlsZC9kb3RuZXQnKTtcblxubGV0IGRvdG5ldFByb2plY3QgPSB7fTtcblxuZG90bmV0UHJvamVjdC5idWlsZCA9IChyb290LCBmaWxlRGlyKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ0J1aWxkaW5nIGRvdG5ldCBwcm9qZWN0Jyk7XG4gICAgbGV0IGRvdG5ldCA9IHNwYXduKCdub2RlJywgW2V4ZWN1dGFibGVQYXRoLCBgL3Jvb3Q6JHtyb290fWAsICcvdHlwZTpidWlsZCcsICcvYXJndW1lbnRzOnJlc3RvcmUnXSwge2N3ZDogZmlsZURpcn0pO1xuICAgIGRvdG5ldC5zdGRvdXQub24oJ2RhdGEnLCAoZGF0YSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRhLnRvU3RyaW5nKCkpO1xuICAgIH0pO1xuXG4gICAgZG90bmV0LnN0ZGVyci5vbignZGF0YScsIChkYXRhKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEudG9TdHJpbmcoKSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGRvdG5ldDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZG90bmV0UHJvamVjdDsiXX0=