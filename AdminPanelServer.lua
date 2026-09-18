-- AdminPanelServer.lua
-- Letakkan Script ini di ServerScriptService.

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

-- GANTI dengan UserId akun admin kamu.
-- Bisa menambahkan lebih dari satu UserId.
local ADMIN_USER_IDS = {
    [123456789] = true,
}

local ALLOWED_ROLES = {
    Player = true,
    VIP = true,
    Moderator = true,
    Admin = true,
}

local remote = ReplicatedStorage:FindFirstChild("AdminPanelRemote")

if not remote then
    remote = Instance.new("RemoteFunction")
    remote.Name = "AdminPanelRemote"
    remote.Parent = ReplicatedStorage
end

local function isAdmin(player)
    return ADMIN_USER_IDS[player.UserId] == true
end

local function trim(text)
    return text:match("^%s*(.-)%s*$")
end

local function findPlayer(identifier)
    local value = trim(tostring(identifier or ""))

    if value == "" then
        return nil, "Masukkan UserId atau username target."
    end

    local userId = tonumber(value)

    if userId then
        local onlinePlayer = Players:GetPlayerByUserId(userId)
        if onlinePlayer then
            return onlinePlayer
        end

        return nil, "Target dengan UserId itu harus sedang online."
    end

    local valueLower = value:lower()

    for _, player in ipairs(Players:GetPlayers()) do
        if player.Name:lower() == valueLower or player.DisplayName:lower() == valueLower then
            return player
        end
    end

    return nil, "Username atau DisplayName tidak ditemukan."
end

local function getTitleValue(player)
    return player:GetAttribute("AdminTitle") or "Player"
end

local function getRoleValue(player)
    return player:GetAttribute("AdminRole") or "Player"
end

local function updateOverheadTag(player)
    local character = player.Character
    local head = character and character:FindFirstChild("Head")

    if not head then
        return
    end

    local oldTag = head:FindFirstChild("AdminOverheadTag")
    if oldTag then
        oldTag:Destroy()
    end

    local tag = Instance.new("BillboardGui")
    tag.Name = "AdminOverheadTag"
    tag.Size = UDim2.fromOffset(220, 58)
    tag.StudsOffset = Vector3.new(0, 3.2, 0)
    tag.AlwaysOnTop = true
    tag.Parent = head

    local titleLabel = Instance.new("TextLabel")
    titleLabel.Size = UDim2.new(1, 0, 0.52, 0)
    titleLabel.BackgroundTransparency = 1
    titleLabel.Text = getTitleValue(player)
    titleLabel.TextColor3 = Color3.fromRGB(52, 235, 255)
    titleLabel.TextStrokeTransparency = 0.35
    titleLabel.Font = Enum.Font.GothamBold
    titleLabel.TextScaled = true
    titleLabel.Parent = tag

    local roleLabel = Instance.new("TextLabel")
    roleLabel.Position = UDim2.new(0, 0, 0.52, 0)
    roleLabel.Size = UDim2.new(1, 0, 0.48, 0)
    roleLabel.BackgroundTransparency = 1
    roleLabel.Text = "[ " .. getRoleValue(player) .. " ]"
    roleLabel.TextColor3 = Color3.fromRGB(255, 104, 201)
    roleLabel.TextStrokeTransparency = 0.35
    roleLabel.Font = Enum.Font.Gotham
    roleLabel.TextScaled = true
    roleLabel.Parent = tag
end

local function connectPlayer(player)
    player.CharacterAdded:Connect(function()
        task.wait(0.5)
        updateOverheadTag(player)
    end)

    player:GetAttributeChangedSignal("AdminTitle"):Connect(function()
        updateOverheadTag(player)
    end)

    player:GetAttributeChangedSignal("AdminRole"):Connect(function()
        updateOverheadTag(player)
    end)
end

remote.OnServerInvoke = function(player, action, data)
    if action == "CheckAdmin" then
        return {
            isAdmin = isAdmin(player),
            title = getTitleValue(player),
            role = getRoleValue(player),
        }
    end

    if not isAdmin(player) then
        warn(player.Name .. " mencoba memakai Admin Panel tanpa izin.")
        return false, "Kamu tidak memiliki izin admin."
    end

    data = data or {}

    if action == "GiveTitle" then
        local target, errorMessage = findPlayer(data.target)
        local title = trim(tostring(data.title or ""))

        if not target then
            return false, errorMessage
        end

        if title == "" then
            return false, "Masukkan title terlebih dahulu."
        end

        if #title > 32 then
            return false, "Title maksimal 32 karakter."
        end

        target:SetAttribute("AdminTitle", title)
        return true, "Title berhasil diberikan kepada " .. target.Name .. "."
    end

    if action == "GiveRole" then
        local target, errorMessage = findPlayer(data.target)
        local role = trim(tostring(data.role or ""))

        if not target then
            return false, errorMessage
        end

        if not ALLOWED_ROLES[role] then
            return false, "Role tidak tersedia."
        end

        target:SetAttribute("AdminRole", role)
        return true, "Role " .. role .. " berhasil diberikan kepada " .. target.Name .. "."
    end

    return false, "Perintah tidak dikenal."
end

Players.PlayerAdded:Connect(function(player)
    player:SetAttribute("AdminTitle", "Player")
    player:SetAttribute("AdminRole", "Player")
    connectPlayer(player)
end)
