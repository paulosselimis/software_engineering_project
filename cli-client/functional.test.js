const { exec } = require('child_process');
const fs = require('fs');

let username='bcvip';
let password='bovp';


describe('CLI Functional Test- Authentication Commands Suite', () => {
   
    test('Login Command - Successful', (done) => {
        const command = `node se2310 login --username admin --password admin`;
       
        exec(command, (error, stdout, stderr) => {
            console.log(stdout)
            console.log(stderr)

            expect(stdout).toContain('Login successful!');
            done();
        });
       
    });
    
    test('Login Command  Failed - Already Logged In', (done) => {
        // const username = 'admin';
        // const password = 'admin';

        const command = `node se2310.js login --username admin --password admin`;
        exec(command, (error, stdout, stderr) => {
            // if (error) {
            //     throw new Error(error);
            // }
            expect(stdout).toContain('You are already logged in!');
            done();

            });
        });
    
        
     test('Logout Command - Successful', (done) => {
            
            const command = `node se2310.js logout`;
           
            exec(command, (error, stdout, stderr) => {
                // if (error) {
                //     throw new Error(error);
                // }
                expect(stdout).toContain('Logged out successfully!');
                done();
            });
           
        });

    test('Login Command - Failed', (done) => {
        // fs.unlinkSync('auth.json');
        const username = 'invaliduser';
        const password = 'invalidpassword';

        const command = `node se2310.js login --username ${username} --password ${password}`;
        // Execute the command and capture any errors
        exec(command, (error, stdout, stderr) => {
         expect(error).toBeDefined();
         expect(stderr.trim()).toContain('Error during login');
           
         done();
        });
    });
    
    test('Logout Command Failed - Logout while not Logged in', (done) => {
        
        const command = `node se2310.js logout`;

        exec(command, (error, stdout, stderr) => {
         expect(error).toBeDefined();
         expect(stdout.trim()).toContain('Please log in first.');
           
         done();
        });
    });
});

describe('CLI Functional Test - Commands When User is Not Logged In', () => {
    beforeAll(() => {
        if (fs.existsSync('auth.json')) {
            fs.unlinkSync('auth.json');
        }
    });

    test('Add User Command', (done) => {
        const command = 'node se2310.js adduser --username testuser --password testpassword';
        exec(command, (error, stdout, stderr) => {
            expect(stdout).toContain('Please log in first.');
            done();
        });
    });

    test('Check User Command', (done) => {
        const command = 'node se2310.js user --username testuser';
        exec(command, (error, stdout, stderr) => {
            expect(stdout).toContain('Please log in first.');
            done();
        });
    });

    test('Health Check Command', (done) => {
        const command = 'node se2310.js healthcheck';
        exec(command, (error, stdout, stderr) => {
            expect(stdout).toContain('Please log in first.');
            done();
        });
    });

    test('Reset All Command', (done) => {
        const command = 'node se2310.js resetall';
        exec(command, (error, stdout, stderr) => {
            expect(stdout).toContain('Please log in first.');
            done();
        });
    });

    test('New Titles Command', (done) => {
        const command = 'node se2310.js newtitles --filename mock.tsv';
        exec(command, (error, stdout, stderr) => {
            expect(stdout).toContain('Please log in first.');
            done();
        });
    });

    test('New Akas Command', (done) => {
        const command = 'node se2310.js newakas --filename mock.tsv';
        exec(command, (error, stdout, stderr) => {
            expect(stdout).toContain('Please log in first.');
            done();
        });
    });
    test('New Names Command', (done) => {
        const command = 'node se2310.js newnames --filename mock.tsv';
        exec(command, (error, stdout, stderr) => {
            expect(stdout).toContain('Please log in first.');
            done();
        });
    });
    
    test('New Crew Command', (done) => {
        const command = 'node se2310.js newcrew --filename mock.tsv';
        exec(command, (error, stdout, stderr) => {
            expect(stdout).toContain('Please log in first.');
            done();
        });
    });
    
    test('New Episode Command', (done) => {
        const command = 'node se2310.js newepisode --filename mock.tsv';
        exec(command, (error, stdout, stderr) => {
            expect(stdout).toContain('Please log in first.');
            done();
        });
    });
    
    test('New Principals Command', (done) => {
        const command = 'node se2310.js newprincipals --filename mock.tsv';
        exec(command, (error, stdout, stderr) => {
            expect(stdout).toContain('Please log in first.');
            done();
        });
    });
    
    test('New Ratings Command', (done) => {
        const command = 'node se2310.js newratings --filename mock.tsv';
        exec(command, (error, stdout, stderr) => {
            expect(stdout).toContain('Please log in first.');
            done();
        });
    });
    
    test('Title Command', (done) => {
        const command = 'node se2310.js title --titleid 12345';
        exec(command, (error, stdout, stderr) => {
            expect(stdout).toContain('Please log in first.');
            done();
        });
    });
    
    test('Search Title Command', (done) => {
        const command = 'node se2310.js searchtitle --titlepart "title"';
        exec(command, (error, stdout, stderr) => {
            expect(stdout).toContain('Please log in first.');
            done();
        });
    });
    
    test('By Genre Command', (done) => {
        const command = 'node se2310.js bygenre --genre "Action" --min 7.5';
        exec(command, (error, stdout, stderr) => {
            expect(stdout).toContain('Please log in first.');
            done();
        });
    });
    
    test('Name Command', (done) => {
        const command = 'node se2310.js name --nameid 67890';
        exec(command, (error, stdout, stderr) => {
            expect(stdout).toContain('Please log in first.');
            done();
        });
    });
    
    test('Search Name Command', (done) => {
        const command = 'node se2310.js searchname --name "John"';
        exec(command, (error, stdout, stderr) => {
            expect(stdout).toContain('Please log in first.');
            done();
        });
    });
    
});


describe('Admin Commands Suite', () => {
    beforeAll(() => {
        const authData = { response: {
            token: 'foo'
        } };
        fs.writeFileSync('auth.json', JSON.stringify(authData));
    });

    test('Add User Command - Add New User Successful', (done) => {
        const command = `node se2310.js adduser --username ${username} --password ${password}`;

        exec(command, (error, stdout, stderr) => {
            if (error) {
                done.fail(error);
                return;
            }
            expect(stdout).toContain('Status: 200');
            expect(stdout).toContain('StatusText: OK');
            expect(stdout).toContain('New user added successfully.');

            done();
        });
    });

    test('Add User Command - Modify User Successful', (done) => {
       
        const command = `node se2310.js adduser --username gina --password ${password}1`;

        exec(command, (error, stdout, stderr) => {
            // If there's an error, fail the test
            if (error) {
                done.fail(error);
                return;
            }
            expect(stdout).toContain('Status: 200');
            expect(stdout).toContain('StatusText: OK');
            expect(stdout).toContain('Password updated successfully.');
            done();
        });
    });


    test('Check User Command - User Exists/Succesful', (done) => {
    
        const command = `node se2310.js user --username admin`;

        exec(command, (error, stdout, stderr) => {
            // If there's an error, fail the test
            if (error) {
                done.fail(error);
                return;
            }
            
            expect(stdout).toContain('Status: 200');
            expect(stdout).toContain('StatusText: OK');
            // expect(stdout).toContain('undefinded'); david bale kati
            
            done();
        });
    });

    test('Check User Command - User Does Not Exist', (done) => {
       
        const command = `node se2310.js user --username kanenas`;
        exec(command, (error, stdout, stderr) => {
            
            if (error) {
                done.fail(error);
                return;
            }
            
            expect(stderr.trim()).toContain('404');
            expect(stderr.trim()).toContain('User not found');
            done();
        });
    });

    test('Health Check Command - Successful', (done) => {
        const command = 'node se2310.js healthcheck';

        exec(command, (error, stdout, stderr) => {
            if (error) {
                done.fail(error);
                return;
            }
           
            expect(stdout).toContain('Status: ');
            expect(stdout).toContain('StatusText: ');
            expect(stdout).toContain(`dataconnection: `);
            
            done();
        });
    });
});

describe('Search Commands Suite', () => {
    beforeAll(() => {
                const authData = { response: {
                    token: 'foo'
                } };
                fs.writeFileSync('auth.json', JSON.stringify(authData));
            });
    
    test('Title Command - Successful Fetch', (done) => {
        const titleId = 'tt0000929'; 
        const command = `node se2310.js title --titleid ${titleId}`;
    
        exec(command, (error, stdout, stderr) => {
            expect(stdout).toContain('Status: 200');
            expect(stdout).toContain('StatusText: OK');
            expect(stdout.trim()).toContain(titleId); 
            done();
        });
    });    
        
    test('Title Command - Title Not Found', (done) => {
        const titleId = 'tt0000000'; // Replace with a non-existent title ID
        const command = `node se2310.js title --titleid ${titleId}`;

        exec(command, (error, stdout, stderr) => {
            expect(stderr.trim()).toContain('404');
            expect(stderr.trim()).toContain( 'Not Found');
            expect(stderr.trim()).toContain('Title not found');
            done();
        });
    });
        
    test('Title Command - Invalid Input', (done) => {
        const command = 'node se2310.js title --titleid ""';

        exec(command, (error, stdout, stderr) => {
           
            expect(stderr.trim()).toContain('404 ');
            done();
        });
    });
        
    test('Search Title Command - Successful Search', (done) => {
        const titlePart = 'Funky';
        const command = `node se2310.js searchtitle --titlepart ${titlePart}`;

        exec(command, (error, stdout, stderr) => {
            expect(stdout).toContain('Status: 200');
            expect(stdout).toContain('StatusText: OK');
            expect(stdout.trim()).toContain(titlePart);
            done();
        });
    });

    test('Search Title Command - No Results Found', (done) => {
        const titlePart = 'RandomTitle';
        const command = `node se2310.js searchtitle --titlepart ${titlePart}`;

        exec(command, (error, stdout, stderr) => {
            expect(stderr.trim()).toContain('404');
            expect(stderr.trim()).toContain( 'Not Found');
            expect(stderr.trim()).toContain(`{ status: 'failed', message: 'No titles found' }`);
            done();
        });
    });

    test('Search Title Command - Invalid Input', (done) => {
        const command = 'node se2310.js searchtitle --titlepart ""';

        exec(command, (error, stdout, stderr) => {
            expect(stderr.trim()).toContain('400 Bad Request');
            expect(stderr.trim()).toContain(`status: 'failed', message: 'titlePart is required'`);
            done();
        });
    });
    test('Search Name Command - Successful Search', (done) => {
        const name = 'James';
        const command = `node se2310.js searchname --name "${name}"`;

        exec(command, (error, stdout, stderr) => {
            expect(stdout).toContain('Status: 200');
            expect(stdout).toContain('StatusText: OK');
            expect(stdout.trim()).toContain(name);
            done();
        });
    });

    test('Search Name Command - No Results Found', (done) => {
        const name = 'RandomName';
        const command = `node se2310.js searchname --name "${name}"`;

        exec(command, (error, stdout, stderr) => {
            expect(stderr.trim()).toContain('404');
            expect(stderr.trim()).toContain( 'Not Found');
            expect(stderr.trim()).toContain(`{ status: 'failed', message: 'No names found' }`);
            done();
        });
    });

    test('Search Name Command - Invalid Input', (done) => {
        const command = 'node se2310.js searchname --name ""';

        exec(command, (error, stdout, stderr) => {
            expect(stderr.trim()).toContain('400 Bad Request');
            expect(stderr.trim()).toContain('namePart is required in the request body');
            done();
        });
    });

    test('Name Command - Successful Fetch', (done) => {
        const nameId = 'nm0000019'; 
        const command = `node se2310.js name --nameid ${nameId}`;

        exec(command, (error, stdout, stderr) => {
            expect(stdout).toContain('Status: 200');
            expect(stdout).toContain('StatusText: OK');
            expect(stdout.trim()).toContain('Federico Fellini'); 
            done();
        });
    });

    test('Name Command - Name Not Found', (done) => {
        const nameId = 'nm9999999'; 
        const command = `node se2310.js name --nameid ${nameId}`;

        exec(command, (error, stdout, stderr) => {
            expect(stderr.trim()).toContain('404');
            expect(stderr.trim()).toContain('Not Found');
            expect(stderr.trim()).toContain('Name not found');
            done();
        });
    });

    test('Name Command - Invalid Input', (done) => {
        const command = 'node se2310.js name --nameid ""';

        exec(command, (error, stdout, stderr) => {
            expect(stderr.trim()).toContain('404');
            expect(stderr.trim()).toContain('Not Found');
            done();
        });
    });

    test('By Genre Command - Successful Search', (done) => {
        const genre = 'Crime'; 
        const minRating = '8.2'; 
        const command = `node se2310.js bygenre --genre ${genre} --min ${minRating}`;

        exec(command, (error, stdout, stderr) => {
            expect(stdout).toContain('Status: 200');
            expect(stdout).toContain('StatusText: OK');
            expect(stdout).toContain('Tell Me That You Love Me');
            done();
        });
    });

    test('By Genre Command - Successful Search with Options', (done) => {
        const genre = 'Crime'; 
        const minRating = '8.2'; 
        const fromYear = '1990'; 
        const toYear = '1997'; 
        const command = `node se2310.js bygenre --genre ${genre} --min ${minRating} --from ${fromYear} --to ${toYear}`;

        exec(command, (error, stdout, stderr) => {
            expect(stdout).toContain('Status: 200');
            expect(stdout).toContain('StatusText: OK');
            expect(stdout).toContain('Tell Me That You Love Me');
            done();
        });
    });

    test('By Genre Command - No Results Found', (done) => {
        const genre = 'Anime'; 
        const minRating = '9'; 
        const command = `node se2310.js bygenre --genre ${genre} --min ${minRating}`;

        exec(command, (error, stdout, stderr) => {
            expect(stdout.trim()).toContain('204');
            expect(stdout.trim()).toContain('No Content');
            
            done();
        });
    });

    test('By Genre Command - Invalid Input', (done) => {
        const genre = 'Crime'; 
        const minRating = '8.2'; 
        const fromYear = '1997'; 
        const toYear = '1990'; 
        const command = `node se2310.js bygenre --genre ${genre} --min ${minRating} --from ${fromYear} --to ${toYear}`;

        exec(command, (error, stdout, stderr) => {
            expect(stdout.trim()).toContain('204');
            expect(stdout.trim()).toContain('No Content');
            
            done();
        });
    });
    

});

describe.only('Uploads Commands Suite', () => {
    beforeAll(() => {
        const authData = { response: {
            token: 'foo'
        } };
        fs.writeFileSync('auth.json', JSON.stringify(authData));
    });

    test.skip('Reset All Command - Successful Reset', (done) => {
        const command = `node se2310.js resetall`;
        
        exec(command, (error, stdout, stderr) => {
        
            expect(stdout).toContain('Status: 200');
            expect(stdout).toContain('StatusText: OK');
         
            done();
        });
    });

    test.skip('New Titles Command - Successful Upload', (done) => {
        const filename = 'truncated_title.basics.tsv'; // Replace with the path to your CSV file
        const command = `node se2310.js newtitles --filename ${filename}`;
    
        exec(command, (error, stdout, stderr) => {
           
            expect(stdout.trim()).toContain('200');
            expect(stdout.trim()).toContain(' OK');
            expect(stdout.trim()).toContain('File processed and data inserted into database.');

            done();
        });
    });

    test('New Titles Command - No Files Found', (done) => {
        const filename = 'test.tsv'; 
        const command = `node se2310.js newtitles --filename ${filename}`;
    
        exec(command, (error, stdout, stderr) => {
            
            expect(stderr.trim()).toContain('ENOENT');
            expect(stderr.trim()).toContain(' no such file or directory');
            done();
        });
    });

    test.skip('New Akas Command - Successful Upload', (done) => {
        const filename = 'truncated_title.akas.tsv'; 
        const command = `node se2310.js newakas --filename ${filename}`;
    
        exec(command, (error, stdout, stderr) => {
            
            expect(stdout.trim()).toContain('200');
            expect(stdout.trim()).toContain(' OK');
            expect(stdout.trim()).toContain('File processed and data inserted into database.');

            done();
        });
    });

    test('New Akas Command - No Files Found', (done) => {
        const filename = 'test.tsv'; 
        const command = `node se2310.js newakas --filename ${filename}`;
    
        exec(command, (error, stdout, stderr) => {
            
            expect(stderr.trim()).toContain('ENOENT');
            expect(stderr.trim()).toContain(' no such file or directory');
            done();
        });
    });
    
    test.skip('New Names Command - Successful Upload', (done) => {
        const filename = 'truncated_name.basics.tsv'; 
        const command = `node se2310.js newnames --filename ${filename}`;
    
        exec(command, (error, stdout, stderr) => {
            
            expect(stdout.trim()).toContain('200');
            expect(stdout.trim()).toContain(' OK');
            expect(stdout.trim()).toContain('File processed and data inserted into database.');

            done();
        });
    });

    test('New Names Command - No Files Found', (done) => {
        const filename = 'test.tsv'; 
        const command = `node se2310.js newnames --filename ${filename}`;
    
        exec(command, (error, stdout, stderr) => {
            
            expect(stderr.trim()).toContain('ENOENT');
            expect(stderr.trim()).toContain(' no such file or directory');
            done();
        });
    });

    test.skip('New Crew Command - Successful Upload', (done) => {
        const filename = 'truncated_title.crew.tsv'; 
        const command = `node se2310.js newcrew --filename ${filename}`;
    
        exec(command, (error, stdout, stderr) => {
            
            expect(stdout.trim()).toContain('200');
            expect(stdout.trim()).toContain(' OK');
            expect(stdout.trim()).toContain('File processed and data inserted into database.');

            done();
        });
    });

    test('New Crew Command - No Crew Found', (done) => {
        const filename = 'test.tsv'; 
        const command = `node se2310.js newcrew --filename ${filename}`;
    
        exec(command, (error, stdout, stderr) => {
            
            expect(stderr.trim()).toContain('ENOENT');
            expect(stderr.trim()).toContain(' no such file or directory');
            done();
        });
    });

    test.skip('New Episodes Command - Successful Upload', (done) => {
        const filename = 'truncated_title.episode.tsv'; 
        const command = `node se2310.js newepisode --filename ${filename}`;
    
        exec(command, (error, stdout, stderr) => {
            
            expect(stdout.trim()).toContain('200');
            expect(stdout.trim()).toContain(' OK');
            expect(stdout.trim()).toContain('File processed and data inserted into database.');

            done();
        });
    });

    test('New Episodes Command - No Files Found', (done) => {
        const filename = 'test.tsv'; 
        const command = `node se2310.js newepisode --filename ${filename}`;
    
        exec(command, (error, stdout, stderr) => {
            
            expect(stderr.trim()).toContain('ENOENT');
            expect(stderr.trim()).toContain(' no such file or directory');
            done();
        });
    });


    test.skip('New Principals Command - Successful Upload', (done) => {
        const filename = 'truncated_title.principals.tsv'; 
        const command = `node se2310.js newprincipals --filename ${filename}`;
    
        exec(command, (error, stdout, stderr) => {
            
            expect(stdout.trim()).toContain('200');
            expect(stdout.trim()).toContain(' OK');
            expect(stdout.trim()).toContain('File processed and data inserted into database.');

            done();
        });
    });

    test('New Principals Command - No Files Found', (done) => {
        const filename = 'test.tsv'; 
        const command = `node se2310.js newprincipals --filename ${filename}`;
    
        exec(command, (error, stdout, stderr) => {
            
            expect(stderr.trim()).toContain('ENOENT');
            expect(stderr.trim()).toContain(' no such file or directory');
            done();
        });
    });

    test.skip('New Ratings Command - Successful Upload', (done) => {
        const filename = 'truncated_title.ratings.tsv'; 
        const command = `node se2310.js newratings --filename ${filename}`;
    
        exec(command, (error, stdout, stderr) => {
            
            expect(stdout.trim()).toContain('200');
            expect(stdout.trim()).toContain(' OK');
            expect(stdout.trim()).toContain('File processed and data inserted into database.');

            done();
        });
    });
    test('New Ratings Command - No Files Found', (done) => {
        const filename = 'test.tsv'; 
        const command = `node se2310.js newratings --filename ${filename}`;
    
        exec(command, (error, stdout, stderr) => {
           
            expect(stderr.trim()).toContain('ENOENT');
            expect(stderr.trim()).toContain(' no such file or directory');
            

            done();
        });
    });
});
