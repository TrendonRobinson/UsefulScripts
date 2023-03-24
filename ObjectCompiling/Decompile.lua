local function valueFromInstance(instance)
    if instance:IsA("StringValue") then
        return instance.Value
    elseif instance:IsA("BoolValue") then
        return instance.Value
    elseif instance:IsA("NumberValue") then
        return instance.Value
    elseif instance:IsA("Color3Value") then
        return instance.Value
    elseif instance:IsA("ObjectValue") then
        return instance.Value
    elseif instance:IsA("CFrameValue") then
        return instance.Value
    elseif instance:IsA("Vector3Value") then
        return instance.Value
    else
        return nil
    end
end

local function convertToObject(configuration)
    local obj = {}

    for _, valueInstance in ipairs(configuration:GetChildren()) do
        local value = valueFromInstance(valueInstance)
        if value then
            obj[valueInstance.Name] = value
        elseif valueInstance:IsA("Configuration") then
            obj[valueInstance.Name] = convertToObject(valueInstance)
        end
    end

    return obj
end

-- Example usage:
local config = convertToConfiguration({
    Name = "ExampleObject",
    StringValue = "Hello, World!",
    NumberValue = 42,
    BoolValue = true,
    NestedObject = {
        Name = "NestedObject",
        NestedNumber = 7
    }
})

local objectFromConfig = convertToObject(config)

print(objectFromConfig.StringValue) -- Output: Hello, World!
print(objectFromConfig.NumberValue) -- Output: 42
print(objectFromConfig.BoolValue) -- Output: true
print(objectFromConfig.NestedObject.NestedNumber) -- Output: 7
