
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Save, 
  Play, 
  ArrowLeft, 
  Plus, 
  GripVertical, 
  Settings,
  Trash2,
  FolderOpen,
  HardDrive,
  FileImage,
  Package,
  Power,
  RefreshCw
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

interface Step {
  id: string;
  type: string;
  name: string;
  description: string;
  icon: any;
  parameters: Record<string, any>;
}

interface Group {
  id: string;
  name: string;
  steps: Step[];
  collapsed: boolean;
}

const SequenceEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [sequenceName, setSequenceName] = useState(isEditing ? "Windows 11 Enterprise Standard" : "");
  const [sequenceDescription, setSequenceDescription] = useState(isEditing ? "Complete Windows 11 deployment with standard applications" : "");
  const [selectedStep, setSelectedStep] = useState<Step | null>(null);

  const stepLibrary: Step[] = [
    {
      id: "partition_disk",
      type: "partition_disk",
      name: "Partition Disk",
      description: "Configure disk partitions",
      icon: HardDrive,
      parameters: {}
    },
    {
      id: "apply_image",
      type: "apply_image",
      name: "Apply Image",
      description: "Deploy reference image",
      icon: FileImage,
      parameters: {}
    },
    {
      id: "install_applications",
      type: "install_applications",
      name: "Install Applications",
      description: "Install selected applications",
      icon: Package,
      parameters: {}
    },
    {
      id: "inject_drivers",
      type: "inject_drivers",
      name: "Inject Drivers",
      description: "Install hardware drivers",
      icon: Settings,
      parameters: {}
    },
    {
      id: "configure_boot",
      type: "configure_boot",
      name: "Configure Boot",
      description: "Set up boot configuration",
      icon: Power,
      parameters: {}
    },
    {
      id: "restart",
      type: "restart",
      name: "Restart",
      description: "Restart the system",
      icon: RefreshCw,
      parameters: {}
    }
  ];

  const [groups, setGroups] = useState<Group[]>([
    {
      id: "group1",
      name: "Disk Preparation",
      collapsed: false,
      steps: [
        stepLibrary[0], // Partition Disk
      ]
    },
    {
      id: "group2",
      name: "Image Deployment",
      collapsed: false,
      steps: [
        stepLibrary[1], // Apply Image
        stepLibrary[3], // Inject Drivers
      ]
    },
    {
      id: "group3",
      name: "Software Installation",
      collapsed: false,
      steps: [
        stepLibrary[2], // Install Applications
      ]
    },
    {
      id: "group4",
      name: "Finalisation",
      collapsed: false,
      steps: [
        stepLibrary[4], // Configure Boot
        stepLibrary[5], // Restart
      ]
    }
  ]);

  const addGroup = () => {
    const newGroup: Group = {
      id: `group${Date.now()}`,
      name: "New Group",
      collapsed: false,
      steps: []
    };
    setGroups([...groups, newGroup]);
  };

  const addStepToGroup = (groupId: string, step: Step) => {
    setGroups(groups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          steps: [...group.steps, { ...step, id: `${step.id}_${Date.now()}` }]
        };
      }
      return group;
    }));
  };

  const removeStep = (groupId: string, stepId: string) => {
    setGroups(groups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          steps: group.steps.filter(step => step.id !== stepId)
        };
      }
      return group;
    }));
  };

  const handleSave = () => {
    console.log("Saving sequence:", { sequenceName, sequenceDescription, groups });
    navigate("/task-sequences");
  };

  const handlePreview = () => {
    console.log("Previewing sequence");
    // Implement preview/simulation logic
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate("/task-sequences")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Task Sequences
          </Button>
          <div>
            <h1 className="text-3xl font-bold">
              {isEditing ? "Edit Task Sequence" : "New Task Sequence"}
            </h1>
            <p className="text-muted-foreground">
              Build your automated deployment workflow
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handlePreview}>
            <Play className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Step Library */}
        <Card>
          <CardHeader>
            <CardTitle>Step Library</CardTitle>
            <CardDescription>Drag steps to build your sequence</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {stepLibrary.map((step) => (
                <div
                  key={step.id}
                  className="flex items-center space-x-2 p-2 border rounded-lg cursor-move hover:bg-muted"
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('application/json', JSON.stringify(step));
                  }}
                >
                  <step.icon className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{step.name}</p>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sequence Builder */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sequence Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sequence-name">Sequence Name</Label>
                <Input
                  id="sequence-name"
                  value={sequenceName}
                  onChange={(e) => setSequenceName(e.target.value)}
                  placeholder="Enter sequence name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sequence-description">Description</Label>
                <Textarea
                  id="sequence-description"
                  value={sequenceDescription}
                  onChange={(e) => setSequenceDescription(e.target.value)}
                  placeholder="Describe what this sequence does"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Sequence Builder</CardTitle>
                  <CardDescription>Organise your deployment steps into logical groups</CardDescription>
                </div>
                <Button onClick={addGroup} size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Group
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {groups.map((group, groupIndex) => (
                  <div
                    key={group.id}
                    className="border rounded-lg p-4"
                    onDrop={(e) => {
                      e.preventDefault();
                      const stepData = JSON.parse(e.dataTransfer.getData('application/json'));
                      addStepToGroup(group.id, stepData);
                    }}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <FolderOpen className="h-4 w-4 text-muted-foreground" />
                        <Input
                          value={group.name}
                          onChange={(e) => {
                            const newGroups = [...groups];
                            newGroups[groupIndex].name = e.target.value;
                            setGroups(newGroups);
                          }}
                          className="border-none p-0 h-auto font-medium bg-transparent"
                        />
                      </div>
                      <Badge variant="outline">{group.steps.length} steps</Badge>
                    </div>

                    <div className="space-y-2 min-h-[100px] border-2 border-dashed border-muted rounded-lg p-2">
                      {group.steps.length === 0 ? (
                        <div className="flex items-center justify-center h-16 text-muted-foreground text-sm">
                          Drop steps here or drag from the library
                        </div>
                      ) : (
                        group.steps.map((step, stepIndex) => (
                          <div
                            key={step.id}
                            className="flex items-center space-x-2 p-2 border rounded bg-white hover:bg-muted cursor-pointer"
                            onClick={() => setSelectedStep(step)}
                          >
                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                            <step.icon className="h-4 w-4 text-muted-foreground" />
                            <div className="flex-1">
                              <p className="text-sm font-medium">{step.name}</p>
                              <p className="text-xs text-muted-foreground">{step.description}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeStep(group.id, step.id);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Step Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>Step Configuration</CardTitle>
            <CardDescription>
              {selectedStep ? `Configure ${selectedStep.name}` : "Select a step to configure"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedStep ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <selectedStep.icon className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{selectedStep.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedStep.description}</p>
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <p className="text-sm font-medium">Step Parameters</p>
                  <div className="text-sm text-muted-foreground">
                    Configuration options for this step will appear here based on the backend schema.
                  </div>
                  {/* Dynamic form fields would be generated here based on the step type */}
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                <Settings className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Select a step from the sequence to configure its parameters</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SequenceEditor;
