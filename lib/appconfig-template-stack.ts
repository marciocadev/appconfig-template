import { CfnResource, Stack, StackProps } from 'aws-cdk-lib';
import { CfnApplication, CfnConfigurationProfile, CfnDeployment, 
  CfnDeploymentStrategy, CfnEnvironment, CfnHostedConfigurationVersion 
} from 'aws-cdk-lib/aws-appconfig';
import { Construct } from 'constructs';
import * as devConfiguration from './configurations/dev.json';
import * as hmgConfiguration from './configurations/hmg.json';
import * as prdConfiguration from './configurations/prd.json';


export class AppconfigTemplateStack extends Stack {
  application:CfnResource;
  confProfile:CfnResource;
  deploymentStrategy:CfnResource

  devEnv:CfnResource;
  hmgEnv:CfnResource;
  prdEnv:CfnResource;

  devHostedConf:CfnResource;
  hmgHostedConf:CfnResource;
  prdHostedConf:CfnResource;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this.application = new CfnApplication(this, 'BasicApplication', {
      name: 'basic-application',
      description: 'My basic AppConfig application'
    });

    this.confProfile = new CfnConfigurationProfile(this, 'ConfigurationProfile', {
      name: 'basic-configuration-profile',
      applicationId: this.application.ref,
      locationUri: 'hosted',
      description: 'My basic AppConfig configuration profile example'
    });

    this.deploymentStrategy = new CfnDeploymentStrategy(this, 'DeploymentStrategy', {
      name: 'basic-deployment-strategy',
      deploymentDurationInMinutes: 0,
      growthFactor: 100,
      finalBakeTimeInMinutes: 0,
      replicateTo: 'NONE',
      growthType: 'LINEAR',
      description: 'My basic AppConfig deployment strategy example'
    });

    // Create environments (DEV, HMG and PRD)
    this.devEnv = new CfnEnvironment(this, 'devConfiguration', {
      name: 'dev', 
      applicationId: this.application.ref
    });
    this.hmgEnv = new CfnEnvironment(this, 'hmgConfiguration', {
      name: 'hmg',
      applicationId: this.application.ref
    });
    this.prdEnv = new CfnEnvironment(this, 'prdConfiguration', {
      name: 'prd',
      applicationId: this.application.ref
    });

    // Create hosted configuration for each environment
    this.devHostedConf = new CfnHostedConfigurationVersion(this, 'DevHostedConfig', {
      applicationId: this.application.ref,
      configurationProfileId: this.confProfile.ref,
      contentType: 'application/json',
      content: JSON.stringify(devConfiguration),
      description: 'My basic AppConfig dev hosted configuration version example'
    });
    this.hmgHostedConf = new CfnHostedConfigurationVersion(this, 'HmgHostedConfig', {
      applicationId: this.application.ref,
      configurationProfileId: this.confProfile.ref,
      contentType: 'application/json',
      content: JSON.stringify(hmgConfiguration),
      description: 'My basic AppConfig hmg hosted configuration version example'
    });
    this.prdHostedConf = new CfnHostedConfigurationVersion(this, 'PrdHostedConfig', {
      applicationId: this.application.ref,
      configurationProfileId: this.confProfile.ref,
      contentType: 'application/json',
      content: JSON.stringify(prdConfiguration),
      description: 'My basic AppConfig prd hosted configuration version example'
    });

    // Deploy environments
    new CfnDeployment(this, 'DevDeployment', {
      applicationId: this.application.ref,
      configurationProfileId: this.confProfile.ref,
      configurationVersion: this.devHostedConf.ref,
      deploymentStrategyId: this.deploymentStrategy.ref,
      environmentId: this.devEnv.ref
    });
    new CfnDeployment(this, 'HmgDeployment', {
      applicationId: this.application.ref,
      configurationProfileId: this.confProfile.ref,
      configurationVersion: this.hmgHostedConf.ref,
      deploymentStrategyId: this.deploymentStrategy.ref,
      environmentId: this.hmgEnv.ref
    });
    new CfnDeployment(this, 'PrdDeployment', {
      applicationId: this.application.ref,
      configurationProfileId: this.confProfile.ref,
      configurationVersion: this.prdHostedConf.ref,
      deploymentStrategyId: this.deploymentStrategy.ref,
      environmentId: this.prdEnv.ref
    });
  }
}
