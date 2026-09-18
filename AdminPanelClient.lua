-- AdminPanelClient.lua
-- Letakkan LocalScript ini di StarterPlayer > StarterPlayerScripts.
-- GUI dibuat otomatis saat pemain admin masuk.

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local player = Players.LocalPlayer
local remote = ReplicatedStorage:WaitForChild("AdminPanelRemote")

local adminInfo = remote:InvokeServer("CheckAdmin")

if not adminInfo or not adminInfo.isAdmin then
    return
end

local playerGui = player:WaitForChild("PlayerGui")
local screenGui = Instance.new("ScreenGui")
screenGui.Name = "AdminPanelGui"
screenGui.ResetOnSpawn = false
screenGui.Parent = playerGui

local function create(className, properties, parent)
    local object = Instance.new(className)

    for property, value in pairs(properties) do
        object[property] = value
    end

    object.Parent = parent
    return object
end

local main = create("Frame", {
    Name = "Main",
    Size = UDim2.fromOffset(360, 440),
    Position = UDim2.new(0.5, -180, 0.5, -220),
    BackgroundColor3 = Color3.fromRGB(11, 16, 32),
    BorderSizePixel = 0,
}, screenGui)

create("UICorner", { CornerRadius = UDim.new(0, 14) }, main)
create("UIStroke", {
    Color = Color3.fromRGB(52, 235, 255),
    Thickness = 1,
    Transparency = 0.35,
}, main)

create("TextLabel", {
    Size = UDim2.new(1, -40, 0, 44),
    Position = UDim2.fromOffset(20, 16),
    BackgroundTransparency = 1,
    Text = "ADMIN PANEL",
    TextColor3 = Color3.fromRGB(236, 249, 255),
    TextSize = 24,
    Font = Enum.Font.GothamBold,
    TextXAlignment = Enum.TextXAlignment.Left,
}, main)

create("TextLabel", {
    Size = UDim2.new(1, -40, 0, 24),
    Position = UDim2.fromOffset(20, 56),
    BackgroundTransparency = 1,
    Text = "Isi UserId atau username target",
    TextColor3 = Color3.fromRGB(167, 191, 217),
    TextSize = 13,
    Font = Enum.Font.Gotham,
    TextXAlignment = Enum.TextXAlignment.Left,
}, main)

local targetInput = create("TextBox", {
    Name = "TargetInput",
    Size = UDim2.new(1, -40, 0, 42),
    Position = UDim2.fromOffset(20, 84),
    BackgroundColor3 = Color3.fromRGB(20, 29, 49),
    BorderSizePixel = 0,
    PlaceholderText = "Tulis UserId atau username di sini",
    PlaceholderColor3 = Color3.fromRGB(130, 153, 177),
    Text = "",
    TextColor3 = Color3.fromRGB(236, 249, 255),
    TextSize = 14,
    Font = Enum.Font.Gotham,
    ClearTextOnFocus = false,
}, main)
create("UICorner", { CornerRadius = UDim.new(0, 8) }, targetInput)

create("TextLabel", {
    Size = UDim2.new(1, -40, 0, 24),
    Position = UDim2.fromOffset(20, 140),
    BackgroundTransparency = 1,
    Text = "Title pemain",
    TextColor3 = Color3.fromRGB(167, 191, 217),
    TextSize = 13,
    Font = Enum.Font.Gotham,
    TextXAlignment = Enum.TextXAlignment.Left,
}, main)

local titleInput = create("TextBox", {
    Name = "TitleInput",
    Size = UDim2.new(1, -40, 0, 42),
    Position = UDim2.fromOffset(20, 168),
    BackgroundColor3 = Color3.fromRGB(20, 29, 49),
    BorderSizePixel = 0,
    PlaceholderText = "Contoh: Content Creator",
    PlaceholderColor3 = Color3.fromRGB(130, 153, 177),
    Text = "",
    TextColor3 = Color3.fromRGB(236, 249, 255),
    TextSize = 14,
    Font = Enum.Font.Gotham,
    ClearTextOnFocus = false,
}, main)
create("UICorner", { CornerRadius = UDim.new(0, 8) }, titleInput)

create("TextLabel", {
    Size = UDim2.new(1, -40, 0, 24),
    Position = UDim2.fromOffset(20, 224),
    BackgroundTransparency = 1,
    Text = "Role pemain",
    TextColor3 = Color3.fromRGB(167, 191, 217),
    TextSize = 13,
    Font = Enum.Font.Gotham,
    TextXAlignment = Enum.TextXAlignment.Left,
}, main)

local roleInput = create("TextBox", {
    Name = "RoleInput",
    Size = UDim2.new(1, -40, 0, 42),
    Position = UDim2.fromOffset(20, 252),
    BackgroundColor3 = Color3.fromRGB(20, 29, 49),
    BorderSizePixel = 0,
    PlaceholderText = "Player / VIP / Moderator / Admin",
    PlaceholderColor3 = Color3.fromRGB(130, 153, 177),
    Text = "Player",
    TextColor3 = Color3.fromRGB(236, 249, 255),
    TextSize = 14,
    Font = Enum.Font.Gotham,
    ClearTextOnFocus = false,
}, main)
create("UICorner", { CornerRadius = UDim.new(0, 8) }, roleInput)

local giveTitleButton = create("TextButton", {
    Name = "GiveTitleButton",
    Size = UDim2.new(0.48, -5, 0, 42),
    Position = UDim2.fromOffset(20, 312),
    BackgroundColor3 = Color3.fromRGB(52, 160, 210),
    BorderSizePixel = 0,
    Text = "GIVE TITLE",
    TextColor3 = Color3.fromRGB(255, 255, 255),
    TextSize = 13,
    Font = Enum.Font.GothamBold,
}, main)
create("UICorner", { CornerRadius = UDim.new(0, 8) }, giveTitleButton)

local giveRoleButton = create("TextButton", {
    Name = "GiveRoleButton",
    Size = UDim2.new(0.48, -5, 0, 42),
    Position = UDim2.new(0.52, 5, 0, 312),
    BackgroundColor3 = Color3.fromRGB(125, 92, 230),
    BorderSizePixel = 0,
    Text = "GIVE ROLE",
    TextColor3 = Color3.fromRGB(255, 255, 255),
    TextSize = 13,
    Font = Enum.Font.GothamBold,
}, main)
create("UICorner", { CornerRadius = UDim.new(0, 8) }, giveRoleButton)

local status = create("TextLabel", {
    Name = "Status",
    Size = UDim2.new(1, -40, 0, 52),
    Position = UDim2.fromOffset(20, 366),
    BackgroundTransparency = 1,
    Text = "Siap. Hanya admin yang bisa menggunakan panel ini.",
    TextColor3 = Color3.fromRGB(167, 191, 217),
    TextSize = 13,
    Font = Enum.Font.Gotham,
    TextWrapped = true,
    TextXAlignment = Enum.TextXAlignment.Left,
}, main)

local function send(action, data)
    status.Text = "Memproses..."

    local success, result, message = pcall(function()
        return remote:InvokeServer(action, data)
    end)

    if not success then
        status.Text = "Gagal menghubungi server."
        status.TextColor3 = Color3.fromRGB(255, 110, 110)
        return
    end

    status.Text = message or "Selesai."
    status.TextColor3 = result
        and Color3.fromRGB(100, 255, 170)
        or Color3.fromRGB(255, 110, 110)
end

giveTitleButton.MouseButton1Click:Connect(function()
    send("GiveTitle", {
        target = targetInput.Text,
        title = titleInput.Text,
    })
end)

giveRoleButton.MouseButton1Click:Connect(function()
    send("GiveRole", {
        target = targetInput.Text,
        role = roleInput.Text,
    })
end)
