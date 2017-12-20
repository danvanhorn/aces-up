TO CREATE TESTS:

create a new maven item, set the command line for that maven item to be:

mvn -DmemoryInMB=2000 -Dcores=2 evosuite:generate evosuite:export  test

tests should export to a .evosuite folder under test, you can either move these to the test folder, or mark the .evosuite folder as a test folder

TO CHECK COVERAGE:

You may need to re-import the project to test, do the re-import, and follow the instructions at https://oregonstate.instructure.com/courses/1648342/pages/testing-projects-within-intellij-idea
if any further help is needed, please contact me on Slack or at Skinnern@oregonstate.edu
Thanks,
Nick