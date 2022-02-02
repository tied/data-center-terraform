const inquirer = require('inquirer');
const chalk = require('chalk');
const emoji = require('node-emoji');
const figlet = require('figlet');
const fuzzy = require('fuzzy');
const _ = require('lodash');


const PROVISION = 'provision';
const awsDetails = {}


const instanceTypes = [
    "t1.micro",
    "t2.nano",
    "t2.micro",
    "t2.small",
    "t2.medium",
    "t2.large",
    "m1.small",
    "m1.medium",
    "m1.large",
    "m1.xlarge",
    "m3.medium",
    "m3.large",
    "m3.xlarge",
    "m3.2xlarge",
    "m4.large",
    "m4.xlarge",
    "m4.2xlarge",
    "m4.4xlarge",
    "m4.10xlarge",
    "m2.xlarge",
    "m2.2xlarge",
    "m2.4xlarge",
    "cr1.8xlarge",
    "r3.large",
    "r3.xlarge",
    "r3.2xlarge",
    "r3.4xlarge",
    "r3.8xlarge",
    "x1.4xlarge",
    "x1.8xlarge",
    "x1.16xlarge",
    "x1.32xlarge",
    "i2.xlarge",
    "i2.2xlarge",
    "i2.4xlarge",
    "i2.8xlarge",
    "hi1.4xlarge",
    "hs1.8xlarge",
    "c1.medium",
    "c1.xlarge",
    "c3.large",
    "c3.xlarge",
    "c3.2xlarge",
    "c3.4xlarge",
    "c3.8xlarge",
    "c4.large",
    "c4.xlarge",
    "c4.2xlarge",
    "c4.4xlarge",
    "c4.8xlarge",
    "cc1.4xlarge",
    "cc2.8xlarge",
    "g2.2xlarge",
    "g2.8xlarge",
    "cg1.4xlarge",
    "d2.xlarge",
    "d2.2xlarge",
    "d2.4xlarge",
    "d2.8xlarge"
]

const regions = [
    'us-east-1',
    'us-east-2',
    'us-west-1',
    'us-west-2',
    'ap-south-1',
    'ca-central-1',
    'ap-northeast-1',
    'ap-southeast-2',
    'ap-southeast-1',
    'ap-northeast-2',
    'eu-central-1',
    'sa-east-1',
    'eu-west-1',
    'eu-west-2',
    'eu-west-3',
    'eu-north-1'
]


const SSM_START_SESSION = 'ssm start-session';
const CREATE_STACK = 'create stack';
const DELETE_CFN_STACK = 'delete stack';
const STACK_STATUS = 'stack status';
const actions = [SSM_START_SESSION, CREATE_STACK, STACK_STATUS, DELETE_CFN_STACK]


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
            var fuzzyResult = fuzzy.filter(input, instanceTypes);
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
            var fuzzyResult = fuzzy.filter(input, regions);
            resolve(
                fuzzyResult.map(function (el) {
                    return el.original;
                })
            );
        }, _.random(30, 500));
    });
}