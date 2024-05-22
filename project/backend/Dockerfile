# Use the official Gradle image as a parent image
FROM gradle:7.3.3-jdk17

# Set the working directory
WORKDIR /home/gradle/project/backend

# Copy the Gradle wrapper and build files
COPY gradlew gradlew.bat build.gradle.kts settings.gradle.kts ./
COPY gradle gradle
COPY . .

# Change the ownership of the build and .gradle directories to the 'gradle' user
RUN chown -R gradle:gradle /home/gradle/project/backend/build /home/gradle/project/backend/.gradle

# Switch to the 'gradle' user
USER gradle

# Command to build and run the application
CMD ["sh", "-c", "./gradlew clean build && ./gradlew bootRun"]
