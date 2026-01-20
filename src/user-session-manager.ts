// Riverside technical challenge
// Objective
// Implement a class AdvancedUserSessionManager that efficiently manages user sessions, tracks user activities, and provides retrieval methods for recent and most active users.
//
// Real-Life Example
// Imagine a video streaming platform where users log in and perform activities like watching videos, liking content, or commenting. The system needs to efficiently track the last K activities per user, retrieve the most recent activities across all users, and identify the most active users.
//
// Class Signature
// class AdvancedUserSessionManager {
//   constructor(maxActivitiesPerUser: number);
//   login(userId: string): void;
//   logout(userId: string): void;
//   recordActivity(userId: string, activity: string): void;
//   getLastNActivities(userId: string, n: number): string[];
//   getRecentActivities(limit: number): string[];
//   getMostActiveUsers(limit: number): string[];
// }
// Methods
// login(userId: string): void
//
// Logs a user into the system.
// If the user is already logged in, nothing changes.
// logout(userId: string): void
//
// Logs a user out of the system.
// Clears their recorded activities.
// recordActivity(userId: string, activity: string): void
//
// Records an activity for the user.
// Only logged-in users can have activities recorded.
// If the user already has K activities, the oldest activity is removed to make space for the new one.
// getLastNActivities(userId: string, n: number): string[]
//
// Retrieves the last N activities of a user.
// If the user has fewer than N activities, return all available activities.
// getRecentActivities(limit: number): string[]
//
// Retrieves the most recent activities across all users, up to the specified limit.
// If there are fewer activities than the limit, return all of them.
// getMostActiveUsers(limit: number): string[]
//
// Returns the M most active users based on the number of activities they have recorded.
// Users are returned in descending order of activity count.
// If there are fewer than M users, return all users.
// Example Usage
// const advancedSessionManager = new AdvancedUserSessionManager(2);
//
// advancedSessionManager.login("user1");
// advancedSessionManager.recordActivity("user1", "Played video A");
// advancedSessionManager.recordActivity("user1", "Uploaded video B");
// console.log(advancedSessionManager.getLastNActivities("user1", 2)); // Output: ["Played video A", "Uploaded video B"]
//
// advancedSessionManager.recordActivity("user1", "Liked video C");
// console.log(advancedSessionManager.getLastNActivities("user1", 2)); // Output: ["Uploaded video B", "Liked video C"]
//
// advancedSessionManager.login("user2");
// advancedSessionManager.recordActivity("user2", "Commented on video D");
// console.log(advancedSessionManager.getRecentActivities(3)); // Output: ["Liked video C", "Commented on video D"]
//
// advancedSessionManager.logout("user1");
//
// console.log(advancedSessionManager.getMostActiveUsers(2)); // Output: ["user2"]
// Expected Behavior
// The login method should correctly add users to the session.
// The recordActivity method should efficiently store up to K activities per user.
// The getLastNActivities method should return the most recent N activities per user.
// The getRecentActivities method should return activities across all users in chronological order.
// The getMostActiveUsers method should correctly rank users by activity count.
// Constraints
// Ensure efficient data handling for a large number of users and activities.
// Properly handle cases where users attempt actions while logged out.
// Edge cases such as requesting more activities than stored should be handled appropriately.

export class AdvancedUserSessionManager {
    private maxActivities: number;
    private store: Map<string, string[]>;
    private activities: string[];

    constructor(maxActivitiesPerUser: number) {
        this.maxActivities = maxActivitiesPerUser;
        this.store = new Map();
        this.activities = [];
    }

    login(userId: string): void {
        // the user is already logged in, nothing changes.
        const user = this.store.get(userId);
        if (!user) {
            this.store.set(userId, []);
        }
    }

    logout(userId: string): void {
        this.store.delete(userId);
    }

    recordActivity(userId: string, activity: string): void {
        // Records an activity for the user.
        // Only logged-in users can have activities recorded.
        // If the user already has K activities, the oldest activity is removed to make space for the new one.

        const userActivities = this.store.get(userId);
        if (!userActivities) return;

        const activitiesCount = userActivities.length;

        if (activitiesCount < this.maxActivities) {
            const updated = [...userActivities, activity];
            this.store.set(userId, updated);
        } else {
            // the oldest activity is removed to make space for the new one.
            const updated = [...userActivities];
            updated.shift();
            this.store.set(userId, [...updated, activity]);
        }

        this.activities.push(activity);
    }

    getLastNActivities(userId: string, n: number): string[] {
        // Retrieves the last N activities of a user.
        // If the user has fewer than N activities, return all available activities.
        const userActivities = this.store.get(userId);
        if (!userActivities) return [];
        if (userActivities.length < n) return userActivities;

        const lastNActivities = userActivities.slice(-n);

        return lastNActivities;
    }

    getRecentActivities(limit: number): string[] {
        // Retrieves the most recent activities across all users, up to the specified limit.
        // If there are fewer activities than the limit, return all of them.
        if (this.activities.length < limit) return [...this.activities].reverse();

        return this.activities.slice(-limit).reverse();
    }

    // todo: possible optimisation 1 - maintain a sorted data structure that updates incrementally - O(1) when cache is valid, O(U log U) on cache rebuild. Cache rebuilds only when users login/logout or activity counts change
    // todo: possible optimisation 2 (very complex) - use a Self-Balancing Tree (Red-Black Tree), O(log U) updates and O(K) retrieval
    getMostActiveUsers(limit: number): string[] {
        // Returns the M most active users based on the number of activities they have recorded.
        // Users are returned in descending order of activity count.
        // If there are fewer than M users, return all users.

        const userActivityCounts = Array.from(this.store.entries()).map(([userId, activities]) => {
            return { userId, count: activities.length };
        });

        userActivityCounts.sort((a, b) => b.count - a.count);

        return userActivityCounts.slice(0, limit).map(item => item.userId);
    }
}

const advancedSessionManager = new AdvancedUserSessionManager(2);

advancedSessionManager.login("user1");
advancedSessionManager.recordActivity("user1", "Played video A");
advancedSessionManager.recordActivity("user1", "Uploaded video B");
console.log(advancedSessionManager.getLastNActivities("user1", 2)); // Output: ["Played video A", "Uploaded video B"]

advancedSessionManager.recordActivity("user1", "Liked video C");
console.log(advancedSessionManager.getLastNActivities("user1", 2)); // Output: ["Uploaded video B", "Liked video C"]

advancedSessionManager.login("user2");
advancedSessionManager.recordActivity("user2", "Commented on video D");
console.log(advancedSessionManager.getRecentActivities(3)); // Output: ["Liked video C", "Commented on video D"]

advancedSessionManager.logout("user1");

console.log(advancedSessionManager.getMostActiveUsers(2)); // Output: ["user2"]
