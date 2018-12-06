"use strict";

var path = require("path");
var fs = require("fs");

module.exports = function (rootDir, type, ignoreRewriteFolder, rerun, forTests) {
    ignoreRewriteFolder = ignoreRewriteFolder || false;
    type = type || "build";
    rerun = rerun || false;

    var currentDir = process.cwd();

    var specsFor = false;
    var settings = {};

    if (type == "build" && forTests) {
        currentDir = currentDir.replace("Source", "Specifications");
    } else {
        if (!ignoreRewriteFolder) {
            if (type == "test" && currentDir.indexOf("Source") >= 0) specsFor = true;
            if (type == "build" && currentDir.indexOf("Specifications") >= 0) currentDir = currentDir.replace("Specifications", "Source");
        }
    }

    var settingsFile = path.join(rootDir, ".buildsettings");
    if (fs.existsSync(settingsFile)) {
        var settinsgAsJson = fs.readFileSync(settingsFile, "utf8");
        settings = JSON.parse(settinsgAsJson);
    }

    var directoryToRun = "";

    if (rerun) {
        directoryToRun = settings[type].workingDir;
    } else {
        var found = false;
        while (currentDir.length > 0) {
            try {
                var content = fs.readdirSync(currentDir);
                var files = content.filter(function (elm) {
                    return elm.match(/.*\.(csproj|sln)/ig);
                });
                if (files.length == 1) {
                    settings[type] = {
                        workingDir: currentDir
                    };
                    found = true;

                    break;
                }
            } catch (ex) {}

            currentDir = currentDir.substr(0, currentDir.lastIndexOf(path.sep));
        }

        if (found) directoryToRun = currentDir;else directoryToRun = settings[type].workingDir;
    }

    fs.writeFileSync(settingsFile, JSON.stringify(settings), "utf8");

    if (specsFor == true) {
        directoryToRun = directoryToRun.replace("Source", "Specifications");
    }

    directoryToRun = directoryToRun.split(" ").join("\ ");

    return directoryToRun;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL1NvdXJjZS9Qcm9qZWN0L0RvdE5ldC9CdWlsZC9yZXNvbHZlUHJvamVjdC5qcyJdLCJuYW1lcyI6WyJwYXRoIiwicmVxdWlyZSIsImZzIiwibW9kdWxlIiwiZXhwb3J0cyIsInJvb3REaXIiLCJ0eXBlIiwiaWdub3JlUmV3cml0ZUZvbGRlciIsInJlcnVuIiwiZm9yVGVzdHMiLCJjdXJyZW50RGlyIiwicHJvY2VzcyIsImN3ZCIsInNwZWNzRm9yIiwic2V0dGluZ3MiLCJyZXBsYWNlIiwiaW5kZXhPZiIsInNldHRpbmdzRmlsZSIsImpvaW4iLCJleGlzdHNTeW5jIiwic2V0dGluc2dBc0pzb24iLCJyZWFkRmlsZVN5bmMiLCJKU09OIiwicGFyc2UiLCJkaXJlY3RvcnlUb1J1biIsIndvcmtpbmdEaXIiLCJmb3VuZCIsImxlbmd0aCIsImNvbnRlbnQiLCJyZWFkZGlyU3luYyIsImZpbGVzIiwiZmlsdGVyIiwiZWxtIiwibWF0Y2giLCJleCIsInN1YnN0ciIsImxhc3RJbmRleE9mIiwic2VwIiwid3JpdGVGaWxlU3luYyIsInN0cmluZ2lmeSIsInNwbGl0Il0sIm1hcHBpbmdzIjoiOztBQUFBLElBQU1BLE9BQU9DLFFBQVEsTUFBUixDQUFiO0FBQ0EsSUFBTUMsS0FBS0QsUUFBUSxJQUFSLENBQVg7O0FBRUFFLE9BQU9DLE9BQVAsR0FBaUIsVUFBVUMsT0FBVixFQUFtQkMsSUFBbkIsRUFBeUJDLG1CQUF6QixFQUE4Q0MsS0FBOUMsRUFBcURDLFFBQXJELEVBQStEO0FBQzVFRiwwQkFBc0JBLHVCQUF1QixLQUE3QztBQUNBRCxXQUFPQSxRQUFRLE9BQWY7QUFDQUUsWUFBUUEsU0FBUyxLQUFqQjs7QUFFQSxRQUFJRSxhQUFhQyxRQUFRQyxHQUFSLEVBQWpCOztBQUdBLFFBQUlDLFdBQVcsS0FBZjtBQUNBLFFBQUlDLFdBQVcsRUFBZjs7QUFHQSxRQUFJUixRQUFRLE9BQVIsSUFBbUJHLFFBQXZCLEVBQWlDO0FBQzdCQyxxQkFBYUEsV0FBV0ssT0FBWCxDQUFtQixRQUFuQixFQUE2QixnQkFBN0IsQ0FBYjtBQUNILEtBRkQsTUFFTztBQUNILFlBQUksQ0FBQ1IsbUJBQUwsRUFBMEI7QUFDdEIsZ0JBQUlELFFBQVEsTUFBUixJQUFrQkksV0FBV00sT0FBWCxDQUFtQixRQUFuQixLQUFnQyxDQUF0RCxFQUF5REgsV0FBVyxJQUFYO0FBQ3pELGdCQUFJUCxRQUFRLE9BQVIsSUFBbUJJLFdBQVdNLE9BQVgsQ0FBbUIsZ0JBQW5CLEtBQXdDLENBQS9ELEVBQWtFTixhQUFhQSxXQUFXSyxPQUFYLENBQW1CLGdCQUFuQixFQUFxQyxRQUFyQyxDQUFiO0FBQ3JFO0FBQ0o7O0FBRUQsUUFBSUUsZUFBZWpCLEtBQUtrQixJQUFMLENBQVViLE9BQVYsRUFBbUIsZ0JBQW5CLENBQW5CO0FBQ0EsUUFBSUgsR0FBR2lCLFVBQUgsQ0FBY0YsWUFBZCxDQUFKLEVBQWlDO0FBQzdCLFlBQUlHLGlCQUFpQmxCLEdBQUdtQixZQUFILENBQWdCSixZQUFoQixFQUE4QixNQUE5QixDQUFyQjtBQUNBSCxtQkFBV1EsS0FBS0MsS0FBTCxDQUFXSCxjQUFYLENBQVg7QUFDSDs7QUFFRCxRQUFJSSxpQkFBaUIsRUFBckI7O0FBRUEsUUFBSWhCLEtBQUosRUFBVztBQUNQZ0IseUJBQWlCVixTQUFTUixJQUFULEVBQWVtQixVQUFoQztBQUNILEtBRkQsTUFFTztBQUNILFlBQUlDLFFBQVEsS0FBWjtBQUNBLGVBQU9oQixXQUFXaUIsTUFBWCxHQUFvQixDQUEzQixFQUE4QjtBQUMxQixnQkFBSTtBQUNBLG9CQUFJQyxVQUFVMUIsR0FBRzJCLFdBQUgsQ0FBZW5CLFVBQWYsQ0FBZDtBQUNBLG9CQUFJb0IsUUFBUUYsUUFBUUcsTUFBUixDQUFlLFVBQVVDLEdBQVYsRUFBZTtBQUFFLDJCQUFPQSxJQUFJQyxLQUFKLENBQVUsb0JBQVYsQ0FBUDtBQUF5QyxpQkFBekUsQ0FBWjtBQUNBLG9CQUFJSCxNQUFNSCxNQUFOLElBQWdCLENBQXBCLEVBQXVCO0FBQ25CYiw2QkFBU1IsSUFBVCxJQUFpQjtBQUNibUIsb0NBQVlmO0FBREMscUJBQWpCO0FBR0FnQiw0QkFBUSxJQUFSOztBQUVBO0FBQ0g7QUFDSixhQVhELENBV0UsT0FBT1EsRUFBUCxFQUFXLENBQUc7O0FBRWhCeEIseUJBQWFBLFdBQVd5QixNQUFYLENBQWtCLENBQWxCLEVBQXFCekIsV0FBVzBCLFdBQVgsQ0FBdUJwQyxLQUFLcUMsR0FBNUIsQ0FBckIsQ0FBYjtBQUNIOztBQUVELFlBQUlYLEtBQUosRUFBV0YsaUJBQWlCZCxVQUFqQixDQUFYLEtBQ0tjLGlCQUFpQlYsU0FBU1IsSUFBVCxFQUFlbUIsVUFBaEM7QUFDUjs7QUFFRHZCLE9BQUdvQyxhQUFILENBQWlCckIsWUFBakIsRUFBK0JLLEtBQUtpQixTQUFMLENBQWV6QixRQUFmLENBQS9CLEVBQXlELE1BQXpEOztBQUVBLFFBQUlELFlBQVksSUFBaEIsRUFBc0I7QUFDbEJXLHlCQUFpQkEsZUFBZVQsT0FBZixDQUF1QixRQUF2QixFQUFpQyxnQkFBakMsQ0FBakI7QUFDSDs7QUFFRFMscUJBQWlCQSxlQUFlZ0IsS0FBZixDQUFxQixHQUFyQixFQUEwQnRCLElBQTFCLENBQStCLElBQS9CLENBQWpCOztBQUVBLFdBQU9NLGNBQVA7QUFDSCxDQS9ERCIsImZpbGUiOiJyZXNvbHZlUHJvamVjdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHBhdGggPSByZXF1aXJlKFwicGF0aFwiKTtcbmNvbnN0IGZzID0gcmVxdWlyZShcImZzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChyb290RGlyLCB0eXBlLCBpZ25vcmVSZXdyaXRlRm9sZGVyLCByZXJ1biwgZm9yVGVzdHMpIHtcbiAgICBpZ25vcmVSZXdyaXRlRm9sZGVyID0gaWdub3JlUmV3cml0ZUZvbGRlciB8fMKgZmFsc2U7XG4gICAgdHlwZSA9IHR5cGUgfHzCoFwiYnVpbGRcIjtcbiAgICByZXJ1biA9IHJlcnVuIHx8IGZhbHNlO1xuICAgIFxuICAgIGxldCBjdXJyZW50RGlyID0gcHJvY2Vzcy5jd2QoKTtcblxuXG4gICAgbGV0IHNwZWNzRm9yID0gZmFsc2U7XG4gICAgbGV0IHNldHRpbmdzID0ge1xuICAgIH07XG5cbiAgICBpZiAodHlwZSA9PSBcImJ1aWxkXCIgJiYgZm9yVGVzdHMpIHtcbiAgICAgICAgY3VycmVudERpciA9IGN1cnJlbnREaXIucmVwbGFjZShcIlNvdXJjZVwiLCBcIlNwZWNpZmljYXRpb25zXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghaWdub3JlUmV3cml0ZUZvbGRlcikge1xuICAgICAgICAgICAgaWYgKHR5cGUgPT0gXCJ0ZXN0XCIgJiYgY3VycmVudERpci5pbmRleE9mKFwiU291cmNlXCIpID49IDApIHNwZWNzRm9yID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICh0eXBlID09IFwiYnVpbGRcIiAmJiBjdXJyZW50RGlyLmluZGV4T2YoXCJTcGVjaWZpY2F0aW9uc1wiKSA+PSAwKSBjdXJyZW50RGlyID0gY3VycmVudERpci5yZXBsYWNlKFwiU3BlY2lmaWNhdGlvbnNcIiwgXCJTb3VyY2VcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgc2V0dGluZ3NGaWxlID0gcGF0aC5qb2luKHJvb3REaXIsIFwiLmJ1aWxkc2V0dGluZ3NcIik7XG4gICAgaWYgKGZzLmV4aXN0c1N5bmMoc2V0dGluZ3NGaWxlKSkge1xuICAgICAgICBsZXQgc2V0dGluc2dBc0pzb24gPSBmcy5yZWFkRmlsZVN5bmMoc2V0dGluZ3NGaWxlLCBcInV0ZjhcIik7XG4gICAgICAgIHNldHRpbmdzID0gSlNPTi5wYXJzZShzZXR0aW5zZ0FzSnNvbik7XG4gICAgfVxuXG4gICAgbGV0IGRpcmVjdG9yeVRvUnVuID0gXCJcIjtcblxuICAgIGlmIChyZXJ1bikge1xuICAgICAgICBkaXJlY3RvcnlUb1J1biA9IHNldHRpbmdzW3R5cGVdLndvcmtpbmdEaXI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgICAgIHdoaWxlIChjdXJyZW50RGlyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbnRlbnQgPSBmcy5yZWFkZGlyU3luYyhjdXJyZW50RGlyKTtcbiAgICAgICAgICAgICAgICBsZXQgZmlsZXMgPSBjb250ZW50LmZpbHRlcihmdW5jdGlvbiAoZWxtKSB7IHJldHVybiBlbG0ubWF0Y2goLy4qXFwuKGNzcHJvanxzbG4pL2lnKTsgfSk7XG4gICAgICAgICAgICAgICAgaWYgKGZpbGVzLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzW3R5cGVdID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgd29ya2luZ0RpcjogY3VycmVudERpclxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBmb3VuZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCAoZXgpIHsgfVxuXG4gICAgICAgICAgICBjdXJyZW50RGlyID0gY3VycmVudERpci5zdWJzdHIoMCwgY3VycmVudERpci5sYXN0SW5kZXhPZihwYXRoLnNlcCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZvdW5kKSBkaXJlY3RvcnlUb1J1biA9IGN1cnJlbnREaXI7XG4gICAgICAgIGVsc2UgZGlyZWN0b3J5VG9SdW4gPSBzZXR0aW5nc1t0eXBlXS53b3JraW5nRGlyO1xuICAgIH1cblxuICAgIGZzLndyaXRlRmlsZVN5bmMoc2V0dGluZ3NGaWxlLCBKU09OLnN0cmluZ2lmeShzZXR0aW5ncyksIFwidXRmOFwiKTtcblxuICAgIGlmIChzcGVjc0ZvciA9PSB0cnVlKSB7XG4gICAgICAgIGRpcmVjdG9yeVRvUnVuID0gZGlyZWN0b3J5VG9SdW4ucmVwbGFjZShcIlNvdXJjZVwiLCBcIlNwZWNpZmljYXRpb25zXCIpO1xuICAgIH1cblxuICAgIGRpcmVjdG9yeVRvUnVuID0gZGlyZWN0b3J5VG9SdW4uc3BsaXQoXCIgXCIpLmpvaW4oXCJcXCBcIik7XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5VG9SdW47XG59O1xuXG5cbiJdfQ==