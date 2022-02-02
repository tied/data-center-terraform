const inquirer = require('inquirer');
const chalk = require('chalk');
const emoji = require('node-emoji');
const figlet = require('figlet');
const fuzzy = require('fuzzy');
const _ = require('lodash');

awsInstances = require('./assets/awsInstances').awsInstances
awsRegions = require('./assets/awsRegions').awsRegions

figlet.text('Terra', {
    font: 'block',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 100,
    whitespaceBreak: true
}, async function (err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(chalk.magentaBright(`${data}`));
    console.log('\n')
    inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));
    inquirer
        .prompt([
            {
                type: 'autocomplete',
                name: 'region',
                message: `${emoji.get('earth_africa')} Select a region:`,
                pageSize: 6,
                source: searchRegions
            },
            {
                type: 'autocomplete',
                name: 'instanceType',
                message: `${emoji.get('earth_africa')} Select an instance type:`,
                pageSize: 6,
                source: searchInstanceTypes
            },
            {
                type: 'input',
                name: 'stackName',
                message: `${emoji.get('one')}  Provide a stack name:`,
            },
        ])
        .then((answers) => {
            awsDetails.region = answers.region;



            console.log("Provisioning.....")

        });
});

function searchInstanceTypes(answers, input) {
    input = input || '';
    return new Promise(function (resolve) {
        setTimeout(function () {
            var fuzzyResult = fuzzy.filter(input, awsInstances);
            resolve(
                fuzzyResult.map(function (el) {
                    return el.original;
                })
            );
        }, _.random(30, 500));
    });
}

function searchRegions(answers, input) {
    input = input || '';
    return new Promise(function (resolve) {
        setTimeout(function () {
            var fuzzyResult = fuzzy.filter(input, awsRegions);
            resolve(
                fuzzyResult.map(function (el) {
                    return el.original;
                })
            );
        }, _.random(30, 500));
    });
}