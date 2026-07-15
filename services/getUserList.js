export const getUserList = async () => {
    try {
        const result = await fetch('https://suite.dev.antzsystems.com/api/v1/auth/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: process.env.ANTZ_API_EMAIL,
                password: process.env.ANTZ_API_PASSWORD
            })
        });

        const data = await result.json();

        if (!result.ok) {
            console.error("auth login failed --->", data);
            throw new Error(data.message || `Login failed with status ${result.status}`);
        }


        const userListResult = await fetch('https://suite.dev.antzsystems.com/api/v1/rpc/execute', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization":`Bearer ${data.access_token}`
            },
            body: JSON.stringify({
                model: "project.project",
                method: "get_employees_without_daily_update",
                args: [[]]
            })
        });

        const userList = await userListResult.json();

        if (!userListResult.ok) {
            console.error("get user list failed --->", userList);
            throw new Error(userList.message || `RPC call failed with status ${userListResult.status}`);
        }

        return userList;

    } catch (error) {
        console.error("getUserList error --->", error.message);
        throw error;
    }
}