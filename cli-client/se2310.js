#!/usr/bin/env node
const { program } = require('commander');
const {
    loginAction,
    logoutAction,
    addUserAction,
    checkUserAction,
    healthCheckAction,
    resetAllAction,
    newTitlesAction,
    newAkasAction,
    newNamesAction,
    newCrewAction,
    newEpisodeAction,
    newPrincipalsAction,
    newRatingsAction,
    getTitleAction,
    searchTitleAction,
    byGenreAction,
    getNameAction,
    searchNameAction
} = require('./actions');

// Login Commander
program
    .command('login')
    .requiredOption('--username <value>', 'Username for login')
    .requiredOption('--password <value>', 'Password for login')
    .option('--format <value>', 'Output format (json or csv) (optional, default: json)')
    .action(loginAction);

// Logout Commander
program
    .command('logout')
    .option('--format <value>', 'Output format (json or csv) (optional, default: json)')
    .action(logoutAction);

// Add User Commander
program
    .command('adduser')
    .requiredOption('--username <value>', 'Username for adding/modifying user')
    .requiredOption('--password <value>', 'Password for adding/modifying user')
    .option('--format <value>', 'Output format (json or csv) (optional, default: json)')
    .action(addUserAction);

// Check User Commander
program
    .command('user')
    .requiredOption('--username <value>', 'Username to check in the database')
    .option('--format <value>', 'Output format (json or csv) (optional, default: json)')
    .action(checkUserAction);

// Health Check Commander
program
    .command('healthcheck')
    .option('--format <value>', 'Output format (json or csv) (optional, default: json)')
    .action(healthCheckAction);

// Reset All Commander
program
    .command('resetall')
    .option('--format <value>', 'Output format (json or csv) (optional, default: json)')
    .action(resetAllAction);

// New Titles Commander
program
    .command('newtitles')
    .option('--filename <value>', 'Specify the filename for new titles operation')
    .option('--format <value>', 'Output format (json or csv) (optional, default: json)')
    .action(newTitlesAction);

// New Akas Commander
program
    .command('newakas')
    .option('--filename <value>', 'Specify the filename for new title akas operation')
    .option('--format <value>', 'Output format (json or csv) (optional, default: json)')
    .action(newAkasAction);

// New Names Commander
program
    .command('newnames')
    .option('--filename <value>', 'Specify the filename for new names operation')
    .option('--format <value>', 'Output format (json or csv) (optional, default: json)')
    .action(newNamesAction);

// New Crew Commander
program
    .command('newcrew')
    .option('--filename <value>', 'Specify the filename for new crew operation')
    .option('--format <value>', 'Output format (json or csv) (optional, default: json)')
    .action(newCrewAction);

// New Episode Commander
program
    .command('newepisode')
    .option('--filename <value>', 'Specify the filename for new episode operation')
    .option('--format <value>', 'Output format (json or csv) (optional, default: json)')
    .action(newEpisodeAction);

// New Principals Commander
program
    .command('newprincipals')
    .option('--filename <value>', 'Specify the filename for new principals operation')
    .option('--format <value>', 'Output format (json or csv) (optional, default: json)')
    .action(newPrincipalsAction);

// New Ratings Commander
program
    .command('newratings')
    .option('--filename <value>', 'Specify the filename for new ratings operation')
    .option('--format <value>', 'Output format (json or csv) (optional, default: json)')
    .action(newRatingsAction);

// Title Commander
program
    .command('title')
    .requiredOption('--titleid <value>', 'Specify the Title ID for fetching title information')
    .option('--format <value>', 'Output format (json or csv) (optional, default: json)')
    .action(getTitleAction);

// Search Title Commander
program
    .command('searchtitle')
    .requiredOption('--titlepart <value>', 'Specify the title part for searching titles')
    .option('--format <value>', 'Output format (json or csv) (optional, default: json)')
    .action(searchTitleAction);

// By Genre Commander
program
    .command('bygenre')
    .requiredOption('--genre <value>', 'Specify the genre for searching titles')
    .requiredOption('--min <value>', 'Specify the minimum rating for titles')
    .option('--from <value>', 'Specify titles from this year onwards')
    .option('--to <value>', 'Specify titles up to this year (inclusive)')
    .option('--format <value>', 'Output format (json or csv) (optional, default: json)')
    .action(byGenreAction);

// Name Commander
program
    .command('name')
    .requiredOption('--nameid <value>', 'Specify the Name ID for fetching name information')
    .option('--format <value>', 'Output format (json or csv) (optional, default: json)')
    .action(getNameAction);

// Search Name Commander
program
    .command('searchname')
    .requiredOption('--name <value>', 'Specify the name for searching names')
    .option('--format <value>', 'Output format (json or csv) (optional, default: json)')
    .action(searchNameAction);

// Parse arguments
program.parse(process.argv);
