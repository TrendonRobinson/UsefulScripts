type DataType = string | boolean | number | Color3 | Instance | CFrame | Vector3;

interface ObjectData {
    [key: string]: DataType | ObjectData;
}

function valueInstanceFromType(value: DataType, key: string): Instance | null {
    if (typeof value === "string") {
        const stringValue = new StringValue();
        stringValue.Name = key;
        return stringValue;
    } else if (typeof value === "boolean") {
        const boolValue = new Instance("BoolValue");
        boolValue.Name = key;
        return boolValue;
    } else if (typeof value === "number") {
        const numberValue = new Instance("NumberValue");
        numberValue.Name = key;
        return numberValue;
    } else if (value instanceof Color3) {
        const color3Value = new Instance("Color3Value");
        color3Value.Name = key;
        return color3Value;
    } else if (value instanceof Instance) {
        const objectValue = new Instance("ObjectValue");
        objectValue.Name = key;
        return objectValue;
    } else if (value instanceof CFrame) {
        const cframeValue = new Instance("CFrameValue");
        cframeValue.Name = key;
        return cframeValue;
    } else if (value instanceof Vector3) {
        const vector3Value = new Instance("Vector3Value");
        vector3Value.Name = key;
        return vector3Value;
    } else {
        return null;
    }
}

function convertToConfiguration(obj: ObjectData, parent?: Instance): Instance {
    const config = new Instance("Configuration");
    config.Name = parent ? `${parent.Name}_${obj.Name}` : obj.Name;
    config.Parent = parent || workspace;

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            const valueInstance = valueInstanceFromType(value as DataType, key);
            if (valueInstance) {
                (valueInstance as any).Value = value;
                valueInstance.Parent = config;
            } else if (typeof value === "object") {
                convertToConfiguration(value as ObjectData, config);
            }
        }
    }

    return config;
}

// Example usage:
const exampleObject: ObjectData = {
    Name: "ExampleObject",
    StringValue: "Hello, World!",
    NumberValue: 42,
    BoolValue: true,
    NestedObject: {
        Name: "NestedObject",
        NestedNumber: 7
    }
};

const config = convertToConfiguration(exampleObject);
