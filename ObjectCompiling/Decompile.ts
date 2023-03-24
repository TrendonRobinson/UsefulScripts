type DataType = string | boolean | number | Color3 | Instance | CFrame | Vector3;

interface ObjectData {
    [key: string]: DataType | ObjectData;
}

function valueFromInstance(instance: Instance): DataType | null {
    if (instance.IsA("StringValue")) {
        return (instance as StringValue).Value;
    } else if (instance.IsA("BoolValue")) {
        return (instance as BoolValue).Value;
    } else if (instance.IsA("NumberValue")) {
        return (instance as NumberValue).Value;
    } else if (instance.IsA("Color3Value")) {
        return (instance as Color3Value).Value;
    } else if (instance.IsA("ObjectValue")) {
        return (instance as ObjectValue).Value;
    } else if (instance.IsA("CFrameValue")) {
        return (instance as CFrameValue).Value;
    } else if (instance.IsA("Vector3Value")) {
        return (instance as Vector3Value).Value;
    } else {
        return null;
    }
}

function convertToObject(configuration: Instance): ObjectData {
    const obj: ObjectData = {};

    for (const valueInstance of configuration.GetChildren()) {
        const value = valueFromInstance(valueInstance);
        if (value !== null) {
            obj[valueInstance.Name] = value;
        } else if (valueInstance.IsA("Configuration")) {
            obj[valueInstance.Name] = convertToObject(valueInstance);
        }
    }

    return obj;
}

// Example usage:
const config = convertToConfiguration({
    Name: "ExampleObject",
    StringValue: "Hello, World!",
    NumberValue: 42,
    BoolValue: true,
    NestedObject: {
        Name: "NestedObject",
        NestedNumber: 7,
    },
});

const objectFromConfig = convertToObject(config);

print(objectFromConfig.StringValue); // Output: Hello, World!
print(objectFromConfig.NumberValue); // Output: 42
print(objectFromConfig.BoolValue); // Output: true
print(objectFromConfig.NestedObject.NestedNumber); // Output: 7
