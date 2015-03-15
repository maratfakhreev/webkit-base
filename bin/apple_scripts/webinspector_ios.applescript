# Customize and Export as Application

set device_name to "iOS Simulator"
tell application "Safari"
  activate
  tell application "System Events"
    click menu item "index.html" of menu device_name of menu item device_name of menu "Develop" of menu bar item "Develop" of menu bar 1 of application process "Safari"
  end tell
end tell
