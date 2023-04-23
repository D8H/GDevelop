const initializeGDevelopJs = require('../../Binaries/embuild/GDevelop.js/libGD.js');

describe('MetadataDeclarationHelper', () => {
  let gd = null;
  beforeAll((done) =>
    initializeGDevelopJs().then((module) => {
      gd = module;
      done();
    })
  );

  it('can create metadata for free actions', () => {
    const extension = new gd.PlatformExtension();
    const project = new gd.Project();

    const eventExtension = project.insertNewEventsFunctionsExtension("MyExtension", 0);
    const eventFunction = eventExtension.insertNewEventsFunction("MyFunction", 0);
    eventFunction.setFunctionType(gd.EventsFunction.Action);
    eventFunction.setFullName("My function");
    eventFunction.setDescription("My function description.");
    eventFunction.setSentence("My function sentence");

    const metadataDeclarationHelper = new gd.MetadataDeclarationHelper();
    metadataDeclarationHelper.generateFreeFunctionMetadata(
      project,
      extension,
      eventExtension,
      eventFunction);
    metadataDeclarationHelper.delete();
    
    expect(extension.getAllActions().has("MyFunction")).toBe(true);
    const action = extension.getAllActions().get("MyFunction");
    expect(action.getFullName()).toBe("My function");
    expect(action.getDescription()).toBe("My function description.");
    expect(action.getSentence()).toBe("My function sentence");

    extension.delete();
    project.delete();
  });

  it('can create metadata for free conditions', () => {
    const extension = new gd.PlatformExtension();
    const project = new gd.Project();

    const eventExtension = project.insertNewEventsFunctionsExtension("MyExtension", 0);
    const eventFunction = eventExtension.insertNewEventsFunction("MyFunction", 0);
    eventFunction.setFunctionType(gd.EventsFunction.Condition);
    eventFunction.setFullName("My function");
    eventFunction.setDescription("My function description.");
    eventFunction.setSentence("My function sentence");

    const metadataDeclarationHelper = new gd.MetadataDeclarationHelper();
    metadataDeclarationHelper.generateFreeFunctionMetadata(
      project,
      extension,
      eventExtension,
      eventFunction);
    metadataDeclarationHelper.delete();
    
    expect(extension.getAllConditions().has("MyFunction")).toBe(true);
    const condition = extension.getAllConditions().get("MyFunction");
    expect(condition.getFullName()).toBe("My function");
    expect(condition.getDescription()).toBe("My function description.");
    expect(condition.getSentence()).toBe("My function sentence");

    extension.delete();
    project.delete();
  });

  it('can create metadata for free expressions', () => {
    const extension = new gd.PlatformExtension();
    const project = new gd.Project();

    const eventExtension = project.insertNewEventsFunctionsExtension("MyExtension", 0);
    const eventFunction = eventExtension.insertNewEventsFunction("MyFunction", 0);
    eventFunction.setFunctionType(gd.EventsFunction.Expression);
    eventFunction.setFullName("My function");
    eventFunction.setDescription("My function description.");

    const metadataDeclarationHelper = new gd.MetadataDeclarationHelper();
    metadataDeclarationHelper.generateFreeFunctionMetadata(
      project,
      extension,
      eventExtension,
      eventFunction);
    metadataDeclarationHelper.delete();
    
    expect(extension.getAllExpressions().has("MyFunction")).toBe(true);
    const expression = extension.getAllExpressions().get("MyFunction");
    expect(expression.getFullName()).toBe("My function");
    expect(expression.getDescription()).toBe("My function description.");

    extension.delete();
    project.delete();
  });

  it('can create metadata for free ExpressionAndConditions', () => {
    const extension = new gd.PlatformExtension();
    const project = new gd.Project();

    const eventExtension = project.insertNewEventsFunctionsExtension("MyExtension", 0);
    const eventFunction = eventExtension.insertNewEventsFunction("Value", 0);
    eventFunction.setFunctionType(gd.EventsFunction.ExpressionAndCondition);
    eventFunction.setFullName("Some value");
    eventFunction.setDescription("some value.");
    eventFunction.setSentence("some value");

    const metadataDeclarationHelper = new gd.MetadataDeclarationHelper();
    metadataDeclarationHelper.generateFreeFunctionMetadata(
      project,
      extension,
      eventExtension,
      eventFunction);
    metadataDeclarationHelper.delete();
    
    expect(extension.getAllExpressions().has("Value")).toBe(true);
    const expression = extension.getAllExpressions().get("Value");
    expect(expression.getFullName()).toBe("Some value");
    expect(expression.getDescription()).toBe("Return some value.");
    
    expect(extension.getAllConditions().has("Value")).toBe(true);
    const condition = extension.getAllConditions().get("Value");
    expect(condition.getFullName()).toBe("Some value");
    expect(condition.getDescription()).toBe("Compare some value.");
    expect(condition.getSentence()).toBe("Some value _PARAM1_ _PARAM2_");

    extension.delete();
    project.delete();
  });

  it('can create metadata for free ActionWithOperator', () => {
    const extension = new gd.PlatformExtension();
    const project = new gd.Project();

    const eventExtension = project.insertNewEventsFunctionsExtension("MyExtension", 0);

    const getter = eventExtension.insertNewEventsFunction("Value", 0);
    getter.setFunctionType(gd.EventsFunction.ExpressionAndConditions);
    getter.setFullName("Some value");
    getter.setDescription("some value.");
    getter.setSentence("some value");

    const eventFunction = eventExtension.insertNewEventsFunction("SetValue", 0);
    eventFunction.setFunctionType(gd.EventsFunction.ActionWithOperator);
    eventFunction.setGetterName("Value");

    const metadataDeclarationHelper = new gd.MetadataDeclarationHelper();
    metadataDeclarationHelper.generateFreeFunctionMetadata(
      project,
      extension,
      eventExtension,
      eventFunction);
    metadataDeclarationHelper.delete();
    
    expect(extension.getAllActions().has("SetValue")).toBe(true);
    const action = extension.getAllActions().get("SetValue");
    expect(action.getFullName()).toBe("Some value");
    expect(action.getDescription()).toBe("Change some value.");
    expect(action.getSentence()).toBe("Change some value: _PARAM1_ _PARAM2_");

    extension.delete();
    project.delete();
  });

  it('can create metadata for behavior actions', () => {
    const extension = new gd.PlatformExtension();
    const project = new gd.Project();

    const eventExtension = project.insertNewEventsFunctionsExtension("MyExtension", 0);
    const eventBehavior = eventExtension.getEventsBasedBehaviors().insertNew("MyBehavior", 0);
    const eventFunction = eventBehavior.getEventsFunctions().insertNewEventsFunction("MyFunction", 0);
    eventFunction.setFunctionType(gd.EventsFunction.Action);
    eventFunction.setFullName("My function");
    eventFunction.setDescription("My function description.");
    eventFunction.setSentence("My function sentence");

    const behaviorMethodMangledNames = new gd.MapStringString();
    gd.MetadataDeclarationHelper.generateBehaviorMetadata(
      project,
      extension,
      eventExtension,
      eventBehavior,
      behaviorMethodMangledNames);
    behaviorMethodMangledNames.delete();
    
    expect(extension.getBehaviorsTypes().size()).toBe(1);
    expect(extension.getBehaviorsTypes().at(0)).toBe("MyBehavior");
    const behaviorMetadata = extension.getBehaviorMetadata("MyBehavior");
    expect(behaviorMetadata.getAllActions().has("MyBehavior::MyFunction")).toBe(true);
    const action = behaviorMetadata.getAllActions().get("MyBehavior::MyFunction");
    expect(action.getFullName()).toBe("My function");
    expect(action.getDescription()).toBe("My function description.");
    expect(action.getSentence()).toBe("My function sentence");

    extension.delete();
    project.delete();
  });

  it('can create metadata for behavior conditions', () => {
    const extension = new gd.PlatformExtension();
    const project = new gd.Project();

    const eventExtension = project.insertNewEventsFunctionsExtension("MyExtension", 0);
    const eventBehavior = eventExtension.getEventsBasedBehaviors().insertNew("MyBehavior", 0);
    const eventFunction = eventBehavior.getEventsFunctions().insertNewEventsFunction("MyFunction", 0);
    eventFunction.setFunctionType(gd.EventsFunction.Condition);
    eventFunction.setFullName("My function");
    eventFunction.setDescription("My function description.");
    eventFunction.setSentence("My function sentence");

    const behaviorMethodMangledNames = new gd.MapStringString();
    gd.MetadataDeclarationHelper.generateBehaviorMetadata(
      project,
      extension,
      eventExtension,
      eventBehavior,
      behaviorMethodMangledNames);
    behaviorMethodMangledNames.delete();
    
    expect(extension.getBehaviorsTypes().size()).toBe(1);
    expect(extension.getBehaviorsTypes().at(0)).toBe("MyBehavior");
    const behaviorMetadata = extension.getBehaviorMetadata("MyBehavior");
    expect(behaviorMetadata.getAllConditions().has("MyBehavior::MyFunction")).toBe(true);
    const condition = behaviorMetadata.getAllConditions().get("MyBehavior::MyFunction");
    expect(condition.getFullName()).toBe("My function");
    expect(condition.getDescription()).toBe("My function description.");
    expect(condition.getSentence()).toBe("My function sentence");

    extension.delete();
    project.delete();
  });

  it('can create metadata for behavior expressions', () => {
    const extension = new gd.PlatformExtension();
    const project = new gd.Project();

    const eventExtension = project.insertNewEventsFunctionsExtension("MyExtension", 0);
    const eventBehavior = eventExtension.getEventsBasedBehaviors().insertNew("MyBehavior", 0);
    const eventFunction = eventBehavior.getEventsFunctions().insertNewEventsFunction("MyFunction", 0);
    eventFunction.setFunctionType(gd.EventsFunction.Expression);
    eventFunction.setFullName("My function");
    eventFunction.setDescription("My function description.");

    const behaviorMethodMangledNames = new gd.MapStringString();
    gd.MetadataDeclarationHelper.generateBehaviorMetadata(
      project,
      extension,
      eventExtension,
      eventBehavior,
      behaviorMethodMangledNames);
    behaviorMethodMangledNames.delete();
    
    expect(extension.getBehaviorsTypes().size()).toBe(1);
    expect(extension.getBehaviorsTypes().at(0)).toBe("MyBehavior");
    const behaviorMetadata = extension.getBehaviorMetadata("MyBehavior");
    expect(behaviorMetadata.getAllExpressions().has("MyFunction")).toBe(true);
    const expression = behaviorMetadata.getAllExpressions().get("MyFunction");
    expect(expression.getFullName()).toBe("My function");
    expect(expression.getDescription()).toBe("My function description.");

    extension.delete();
    project.delete();
  });

  it('can create metadata for behavior ExpressionAndConditions', () => {
    const extension = new gd.PlatformExtension();
    const project = new gd.Project();

    const eventExtension = project.insertNewEventsFunctionsExtension("MyExtension", 0);
    const eventBehavior = eventExtension.getEventsBasedBehaviors().insertNew("MyBehavior", 0);
    const eventFunction = eventBehavior.getEventsFunctions().insertNewEventsFunction("Value", 0);
    eventFunction.setFunctionType(gd.EventsFunction.ExpressionAndCondition);
    eventFunction.setFullName("Some value");
    eventFunction.setDescription("some value.");
    eventFunction.setSentence("some value");
    gd.WholeProjectRefactorer.ensureBehaviorEventsFunctionsProperParameters(
      eventExtension,
      eventBehavior
    );

    const behaviorMethodMangledNames = new gd.MapStringString();
    gd.MetadataDeclarationHelper.generateBehaviorMetadata(
      project,
      extension,
      eventExtension,
      eventBehavior,
      behaviorMethodMangledNames);
    behaviorMethodMangledNames.delete();
    
    expect(extension.getBehaviorsTypes().size()).toBe(1);
    expect(extension.getBehaviorsTypes().at(0)).toBe("MyBehavior");
    const behaviorMetadata = extension.getBehaviorMetadata("MyBehavior");

    expect(behaviorMetadata.getAllExpressions().has("Value")).toBe(true);
    const expression = behaviorMetadata.getAllExpressions().get("Value");
    expect(expression.getFullName()).toBe("Some value");
    expect(expression.getDescription()).toBe("Return some value.");
    
    expect(behaviorMetadata.getAllConditions().has("MyBehavior::Value")).toBe(true);
    const condition = behaviorMetadata.getAllConditions().get("MyBehavior::Value");
    expect(condition.getFullName()).toBe("Some value");
    expect(condition.getDescription()).toBe("Compare some value.");
    expect(condition.getSentence()).toBe("Some value of _PARAM0_ _PARAM2_ _PARAM3_");

    extension.delete();
    project.delete();
  });

  it('can create metadata for object actions', () => {
    const extension = new gd.PlatformExtension();
    const project = new gd.Project();

    const eventExtension = project.insertNewEventsFunctionsExtension("MyExtension", 0);
    const eventObject = eventExtension.getEventsBasedObjects().insertNew("MyObject", 0);
    const eventFunction = eventObject.getEventsFunctions().insertNewEventsFunction("MyFunction", 0);
    eventFunction.setFunctionType(gd.EventsFunction.Action);
    eventFunction.setFullName("My function");
    eventFunction.setDescription("My function description.");
    eventFunction.setSentence("My function sentence");

    const objectMethodMangledNames = new gd.MapStringString();
    gd.MetadataDeclarationHelper.generateObjectMetadata(
      project,
      extension,
      eventExtension,
      eventObject,
      objectMethodMangledNames);
    objectMethodMangledNames.delete();
    
    expect(extension.getExtensionObjectsTypes().size()).toBe(1);
    expect(extension.getExtensionObjectsTypes().at(0)).toBe("MyObject");
    const objectMetadata = extension.getObjectMetadata("MyObject");
    expect(objectMetadata.getAllActions().has("MyObject::MyFunction")).toBe(true);
    const action = objectMetadata.getAllActions().get("MyObject::MyFunction");
    expect(action.getFullName()).toBe("My function");
    expect(action.getDescription()).toBe("My function description.");
    expect(action.getSentence()).toBe("My function sentence");

    extension.delete();
    project.delete();
  });

  describe('shiftSentenceParamIndexes', () => {
  it('give back the sentence when there is no parameters', () => {
    expect(gd.MetadataDeclarationHelper.shiftSentenceParamIndexes('Make an action', 2)).toBe(
      'Make an action'
    );
  });
  it('can shift a parameter at the end', () => {
    expect(gd.MetadataDeclarationHelper.shiftSentenceParamIndexes('Change the speed to _PARAM2_', 2)).toBe(
      'Change the speed to _PARAM4_'
    );
  });
  it('can shift a parameter at the beginning', () => {
    expect(gd.MetadataDeclarationHelper.shiftSentenceParamIndexes('_PARAM2_ is moving', 2)).toBe(
      '_PARAM4_ is moving'
    );
  });
  it('can shift a parameter alone', () => {
    expect(gd.MetadataDeclarationHelper.shiftSentenceParamIndexes('_PARAM2_', 2)).toBe('_PARAM4_');
  });
  it(`can shift parameters in a sentence with non-latin characters`, () => {
    expect(
      gd.MetadataDeclarationHelper.shiftSentenceParamIndexes(
        'Скорость превышает _PARAM2_ пикселей в секунду',
        1
      )
    ).toBe(
      'Скорость превышает _PARAM3_ пикселей в секунду'
    );
  });
  it("won't shift an ill-formed parameter", () => {
    expect(
      gd.MetadataDeclarationHelper.shiftSentenceParamIndexes(
        'The speed is greater than PARAM2_ pixels per second',
        2
      )
    ).toBe('The speed is greater than PARAM2_ pixels per second');
    expect(
      gd.MetadataDeclarationHelper.shiftSentenceParamIndexes(
        'The speed is greater than _PARAM2 pixels per second',
        2
      )
    ).toBe('The speed is greater than _PARAM2 pixels per second');
    expect(
      gd.MetadataDeclarationHelper.shiftSentenceParamIndexes(
        'The speed is greater than PARAM2 pixels per second',
        2
      )
    ).toBe('The speed is greater than PARAM2 pixels per second');
    expect(
      gd.MetadataDeclarationHelper.shiftSentenceParamIndexes(
        'The speed is greater than _param2_ pixels per second',
        2
      )
    ).toBe('The speed is greater than _param2_ pixels per second');
    expect(
      gd.MetadataDeclarationHelper.shiftSentenceParamIndexes(
        'The speed is greater than 2 pixels per second',
        2
      )
    ).toBe('The speed is greater than 2 pixels per second');
  });
  [2, 0, -2].forEach(indexOffset => {
    it(`can shift 1 parameter by ${indexOffset}`, () => {
      expect(
        gd.MetadataDeclarationHelper.shiftSentenceParamIndexes(
          'The speed is greater than _PARAM2_ pixels per second',
          indexOffset
        )
      ).toBe(
        'The speed is greater than _PARAM' +
          (2 + indexOffset) +
          '_ pixels per second'
      );
    });
    it(`can shift 2 parameters by ${indexOffset}`, () => {
      expect(
        gd.MetadataDeclarationHelper.shiftSentenceParamIndexes(
          'The speed is between _PARAM1_ and _PARAM2_ pixels per second',
          indexOffset
        )
      ).toBe(
        `The speed is between _PARAM${1 + indexOffset}_ and _PARAM${2 +
          indexOffset}_ pixels per second`
      );
    });
    it(`can shift 2 parameters with jumbled indexes by ${indexOffset}`, () => {
      expect(
        gd.MetadataDeclarationHelper.shiftSentenceParamIndexes(
          'The speed is between _PARAM3_ and _PARAM2_ pixels per second',
          indexOffset
        )
      ).toBe(
        `The speed is between _PARAM${3 + indexOffset}_ and _PARAM${2 +
          indexOffset}_ pixels per second`
      );
    });
  });
});
});
