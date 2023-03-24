local function valueInstanceFromType(value)
    if type(value) == "string" then
        return Instance.new("StringValue")
    elseif type(value) == "boolean" then
        return Instance.new("BoolValue")
    elseif type(value) == "number" then
        return Instance.new("NumberValue")
    elseif typeof(value) == "Color3" then
        return Instance.new("Color3Value")
    elseif typeof(value) == "Instance" then
        return Instance.new("ObjectValue")
    elseif typeof(value) == "CFrame" then
        return Instance.new("CFrameValue")
    elseif typeof(value) == "Vector3" then
        return Instance.new("Vector3Value")
    else
        return nil
    end
end

local function convertToConfiguration(obj, parent)
    local config = Instance.new("Configuration")
    config.Name = parent and (parent.Name .. "_" .. obj.Name) or obj.Name
    config.Parent = parent or workspace

    for key, value in pairs(obj) do
        local valueInstance = valueInstanceFromType(value)
        if valueInstance then
            valueInstance.Name = key
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
