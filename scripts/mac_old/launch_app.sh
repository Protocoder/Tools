#!/bin/bash

cd "$(dirname "$0")"

./adb shell am start -n adb shell am start -n org.protocoder.normal/org.protocoder.activities.LauncherActivity

