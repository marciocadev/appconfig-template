import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { AppconfigTemplateStack } from '../lib/appconfig-template-stack';


describe('AppConfig Template Tests', () => {
    let app:App;
    let stack:AppconfigTemplateStack;
    let template:Template;

    let applicationId:string;
    let configProfileId:string;
    let deploymentStrategyId:string;

    let devHostedConfigId:string;
    let hmgHostedConfigId:string;
    let prdHostedConfigId:string;

    let devEnvId:string;
    let hmgEnvId:string;
    let prdEnvId:string;

    beforeAll(() => {
        // GIVEN
        app = new App();
        // WHEN
        stack = new AppconfigTemplateStack(app, 'MyAppConfigTemplateTest');
        // THEN
        template = Template.fromStack(stack);

        applicationId = stack.resolve(stack.application.node.id);
        configProfileId = stack.resolve(stack.confProfile.node.id);
        deploymentStrategyId = stack.resolve(stack.deploymentStrategy.node.id);

        devHostedConfigId = stack.resolve(stack.devHostedConf.node.id);
        hmgHostedConfigId = stack.resolve(stack.hmgHostedConf.node.id);
        prdHostedConfigId = stack.resolve(stack.prdHostedConf.node.id);

        devEnvId = stack.resolve(stack.devEnv.node.id);
        hmgEnvId = stack.resolve(stack.hmgEnv.node.id);
        prdEnvId = stack.resolve(stack.prdEnv.node.id);
    });

    test(('Snapshot validation'), () => {
        expect(template).toMatchSnapshot();
    });

    test(('AppConfig application created'), () => {
        template.resourceCountIs('AWS::AppConfig::Application', 1);
        template.hasResourceProperties('AWS::AppConfig::Application', {
            Name: 'basic-application'
        });
    });

    test('AppConfig Configuration Profile Created', () => {
        template.resourceCountIs('AWS::AppConfig::ConfigurationProfile', 1);
        template.hasResourceProperties('AWS::AppConfig::ConfigurationProfile', {
            Name: 'basic-configuration-profile',
            LocationUri: 'hosted',
            ApplicationId: {
                Ref: applicationId
            }
        });
    });

    test('AppConfig Deployment Strategy Created', () => {
        template.resourceCountIs('AWS::AppConfig::DeploymentStrategy', 1);
        template.hasResourceProperties('AWS::AppConfig::DeploymentStrategy', {
            Name: 'basic-deployment-strategy',
            DeploymentDurationInMinutes: 0,
            GrowthFactor: 100,
            FinalBakeTimeInMinutes: 0,
            ReplicateTo: 'NONE',
            GrowthType: 'LINEAR'
        });
    });

    test('AppConfig Environment count', () => {
        template.resourceCountIs('AWS::AppConfig::Environment', 3);
    });

    test('AppConfig DEV Environment Created', () => {
        template.hasResourceProperties('AWS::AppConfig::Environment', {
            Name: 'dev',
            ApplicationId: {
                Ref: applicationId
            }
        });
    });

    test('AppConfig HMG Environment Created', () => {
        template.hasResourceProperties('AWS::AppConfig::Environment', {
            Name: 'hmg',
            ApplicationId: {
                Ref: applicationId
            }
        });
    });

    test('AppConfig PRD Environment Created', () => {
        template.hasResourceProperties('AWS::AppConfig::Environment', {
            Name: 'prd',
            ApplicationId: {
                Ref: applicationId
            }
        });
    });

    test('AppConfig Hosted Configuration Version count', () => {
        template.resourceCountIs('AWS::AppConfig::HostedConfigurationVersion', 3);
    });

    test('AppConfig DEV Hosted Configuration Version Created', () => {
        template.findResources('AWS::AppConfig::HostedConfigurationVersion');
        template.hasResourceProperties('AWS::AppConfig::HostedConfigurationVersion', {
            ApplicationId: {
                Ref: applicationId
            },
            ConfigurationProfileId: {
                Ref: configProfileId
            },
            ContentType: 'application/json',
            Content: JSON.stringify({env: 'dev'})
        });
    });

    test('AppConfig HMG Hosted Configuration Version Created', () => {
        template.hasResourceProperties('AWS::AppConfig::HostedConfigurationVersion', {
            ApplicationId: {
                Ref: applicationId
            },
            ConfigurationProfileId: {
                Ref: configProfileId
            },
            ContentType: 'application/json',
            Content: JSON.stringify({env: 'hmg'})
        });
    });

    test('AppConfig PRD Hosted Configuration Version Created', () => {
        template.hasResourceProperties('AWS::AppConfig::HostedConfigurationVersion', {
            ApplicationId: {
                Ref: applicationId
            },
            ConfigurationProfileId: {
                Ref: configProfileId
            },
            ContentType: 'application/json',
            Content: JSON.stringify({env: 'prd'})
        });
    });

    test('AppConfig Deployment count', () => {
        template.resourceCountIs('AWS::AppConfig::Deployment', 3);
    });

    test('AppConfig DEV Deployment Created', () => {
        template.hasResourceProperties('AWS::AppConfig::Deployment', {
            ApplicationId: {
                Ref: applicationId
            },
            ConfigurationProfileId: {
                Ref: configProfileId
            },
            ConfigurationVersion: {
                Ref: devHostedConfigId
            },
            DeploymentStrategyId: {
                Ref: deploymentStrategyId
            },
            EnvironmentId: {
                Ref: devEnvId
            }
        });
    });

    test('AppConfig HMG Deployment Created', () => {
        template.hasResourceProperties('AWS::AppConfig::Deployment', {
            ApplicationId: {
                Ref: applicationId
            },
            ConfigurationProfileId: {
                Ref: configProfileId
            },
            ConfigurationVersion: {
                Ref: hmgHostedConfigId
            },
            DeploymentStrategyId: {
                Ref: deploymentStrategyId
            },
            EnvironmentId: {
                Ref: hmgEnvId
            }
        });
    });

    test('AppConfig PRD Deployment Created', () => {
        template.hasResourceProperties('AWS::AppConfig::Deployment', {
            ApplicationId: {
                Ref: applicationId
            },
            ConfigurationProfileId: {
                Ref: configProfileId
            },
            ConfigurationVersion: {
                Ref: prdHostedConfigId
            },
            DeploymentStrategyId: {
                Ref: deploymentStrategyId
            },
            EnvironmentId: {
                Ref: prdEnvId
            }
        });
    });
});
