import express from "express";
import { storage } from "./storage";
import { z } from "zod";

const router = express.Router();

// Get dashboard data
router.get("/api/dashboard", async (req, res) => {
  try {
    const data = await storage.getDashboardData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch dashboard data" });
  }
});

// Regenerate meal plan
router.post("/api/regenerate", async (req, res) => {
  try {
    const data = await storage.getDashboardData();
    if (data.regenerationsLeft <= 0) {
      return res.status(400).json({ error: "No regenerations left" });
    }

    await storage.updateRegenerationsLeft(data.regenerationsLeft - 1);
    const updatedData = await storage.getDashboardData();
    
    // Simulate regeneration delay
    setTimeout(() => {
      res.json({ regenerationsLeft: updatedData.regenerationsLeft });
    }, 2000);
  } catch (error) {
    res.status(500).json({ error: "Failed to regenerate meal plan" });
  }
});

// Skip meal
const skipMealSchema = z.object({
  mealId: z.string(),
});

router.post("/api/skip-meal", async (req, res) => {
  try {
    const { mealId } = skipMealSchema.parse(req.body);
    await storage.skipMeal(mealId);
    const data = await storage.getDashboardData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to skip meal" });
  }
});

// Set empty state
router.post("/api/set-empty-state", async (req, res) => {
  try {
    storage.setEmptyState();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to set empty state" });
  }
});

// Set demo state
router.post("/api/set-demo-state", async (req, res) => {
  try {
    storage.setDemoState();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to set demo state" });
  }
});

export default router;
