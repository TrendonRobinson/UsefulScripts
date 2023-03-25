import Object from "@rbxts/object-utils";

type DataType = string | boolean | number | Color3 | Instance | CFrame | Vector3;

interface ObjectData {
	[key: string]: DataType | ObjectData;
}

function valueInstanceFromType(value: DataType, key: string): Instance | undefined {
	if (typeOf(value) === "string") {
		const stringValue = new Instance("StringValue");
		stringValue.Name = key;
		return stringValue;
	} else if (typeOf(value) === "boolean") {
		const boolValue = new Instance("BoolValue");
		boolValue.Name = key;
		return boolValue;
	} else if (typeOf(value) === "number") {
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
		return undefined;
	}
}

export function convertToConfiguration(
	obj: ObjectData,
	Info: {
		parent: Instance;
		configName: string;
	},
): Instance {
	const config = new Instance("Configuration");
	config.Name = Info.configName;
	config.Parent = Info.parent;

	for (const key of Object.keys(obj)) {
		if (obj[key]) {
			const value = obj[key];
			const valueInstance = valueInstanceFromType(value as DataType, tostring(key));
			if (valueInstance) {
				(valueInstance as any).Value = value;
				valueInstance.Parent = config;
			} else if (typeOf(value) === "table") {
				convertToConfiguration(value as ObjectData, {
					configName: typeIs(key, "string") ? key : "ChildConfigration",
					parent: config,
				});
			}
		}
	}

	return config;
}
