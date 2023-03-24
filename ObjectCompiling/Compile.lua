local function valueInstanceFromType(value, key)
    if type(value) == "string" then
        local stringValue = Instance.new("StringValue")
        stringValue.Name = key
        return stringValue
    elseif type(value) == "boolean" then
        local boolValue = Instance.new("BoolValue")
        boolValue.Name = key
        return boolValue
    elseif type(value) == "number" then
        local numberValue = Instance.new("NumberValue")
        numberValue.Name = key
        return numberValue
    elseif typeof(value) == "Color3" then
        local color3Value = Instance.new("Color3Value")
        color3Value.Name = key
        return color3Value
    elseif typeof(value) == "Instance" then
        local objectValue = Instance.new("ObjectValue")
        objectValue.Name = key
        return objectValue
    elseif typeof(value) == "CFrame" then
        local cframeValue = Instance.new("CFrameValue")
        cframeValue.Name = key
        return cframeValue
    elseif typeof(value) == "Vector3" then
        local vector3Value = Instance.new("Vector3Value")
        vector3Value.Name = key
        return vector3Value
    else
        return nil
    end
end

local function convertToConfiguration(obj, parent)
    local config = Instance.new("Configuration")
    config.Name = parent and (parent.Name .. "_" .. obj.Name) or obj.Name
    config.Parent = parent or workspace

    for key, value in pairs(obj) do
        local valueInstance = valueInstanceFromType(value, key)
        if valueInstance then
            valueInstance.Value = value
            valueInstance.Parent = config
        elseif type(value) == "table" then
            convertToConfiguration(value, config)
        end
    end

    return config
end

-- Example usage:
local exampleObject = {
    Name = "ExampleObject",
    StringValue = "Hello, World!",
    NumberValue = 42,
    BoolValue = true,
    NestedObject = {
        Name = "NestedObject",
        NestedNumber = 7
    }
}

local config = convertToConfiguration(exampleObject)
